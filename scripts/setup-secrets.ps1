[CmdletBinding()]
param(
    [string]$UmbrellaPath = $env:UMBRELLA_HOME,
    [string]$UmbrellaRepository = "https://github.com/Dotslashcrash/Umbrella.git",
    [switch]$NonInteractive
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$RequiredVariables = @(
    "GOOGLE_CHAT_WEBHOOK_URL"
)

function Write-UmbrellaInfo {
    param([string]$Message)
    Write-Host "[umbrella] $Message"
}

function Fail {
    param([string]$Message)
    Write-Error $Message
    exit 1
}

function Find-Umbrella {
    if ($UmbrellaPath -and (Test-Path -LiteralPath (Join-Path $UmbrellaPath "scripts/pull-secrets.ps1"))) {
        return (Resolve-Path -LiteralPath $UmbrellaPath).Path
    }

    $sibling = Join-Path (Split-Path -Parent $ProjectRoot) "Umbrella"
    if (Test-Path -LiteralPath (Join-Path $sibling "scripts/pull-secrets.ps1")) {
        return (Resolve-Path -LiteralPath $sibling).Path
    }

    if ($null -eq (Get-Command git -ErrorAction SilentlyContinue)) {
        Fail "Umbrella was not found and Git is not installed. Clone $UmbrellaRepository or set UMBRELLA_HOME."
    }

    Write-UmbrellaInfo "Umbrella was not found beside this repository. Cloning shared framework."
    git clone $UmbrellaRepository $sibling
    if ($LASTEXITCODE -ne 0) {
        Fail "Could not clone Umbrella from $UmbrellaRepository."
    }

    return $sibling
}

function Import-DotEnvNames {
    param([string]$Path)

    $names = @{}
    if (-not (Test-Path -LiteralPath $Path)) {
        return $names
    }

    foreach ($line in Get-Content -LiteralPath $Path) {
        if ($line -match '^\s*#' -or $line -notmatch '=') {
            continue
        }

        $parts = $line -split '=', 2
        $name = $parts[0].Trim()
        $value = $parts[1]
        if ($name -and -not [string]::IsNullOrWhiteSpace($value)) {
            $names[$name] = $true
        }
    }

    return $names
}

function Handle-MissingRequiredSecret {
    param([string]$Name)

    Write-Host ""
    Write-Host "Missing required secret: $Name"
    Write-Host ""
    Write-Host "This secret was not found in Azure Key Vault."
    Write-Host ""
    Write-Host "Options:"
    Write-Host "1. Add the secret to Azure Key Vault now."
    Write-Host "2. Skip for local development."
    Write-Host "3. Exit setup."
    Write-Host ""
    Write-Host "No secret value will be printed or stored in Git."

    if ($NonInteractive -or -not [Environment]::UserInteractive) {
        return "Exit"
    }

    $choice = Read-Host "Choose 1, 2, or 3"
    switch ($choice) {
        "1" { return "Add" }
        "2" { return "Skip" }
        default { return "Exit" }
    }
}

$UmbrellaRoot = Find-Umbrella
$PullScript = Join-Path $UmbrellaRoot "scripts/pull-secrets.ps1"
$ValidateScript = Join-Path $UmbrellaRoot "scripts/validate-env.ps1"
$EnvPath = Join-Path $ProjectRoot ".env"

Write-UmbrellaInfo "Using Umbrella at $UmbrellaRoot"
& $ValidateScript
if ($LASTEXITCODE -ne 0) {
    Fail "Umbrella validation failed. No secret values were printed."
}

& $PullScript -OutputPath $EnvPath
if ($LASTEXITCODE -ne 0) {
    Fail "Umbrella secret pull failed. No secret values were printed."
}

$availableNames = Import-DotEnvNames -Path $EnvPath
$missing = @()
foreach ($required in $RequiredVariables) {
    if (-not $availableNames.ContainsKey($required)) {
        $missing += $required
    }
}

$skipped = @()
foreach ($name in $missing) {
    $action = Handle-MissingRequiredSecret -Name $name
    if ($action -eq "Skip") {
        $skipped += $name
        continue
    }

    if ($action -eq "Add") {
        Write-Host "Add $name to Azure Key Vault and Umbrella config/secret-map.json, then rerun this setup script."
    }

    Fail "Missing required secrets: $($missing -join ', ')."
}

if ($skipped.Count -gt 0) {
    Write-UmbrellaInfo "Skipped local-only secrets: $($skipped -join ', ')."
}

Write-UmbrellaInfo "Local .env is ready at $EnvPath. Secret values were not printed."
