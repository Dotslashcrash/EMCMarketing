# Secrets and Configuration

This repository uses the shared Griffin Technology Partners Umbrella framework for local secret setup. Azure Key Vault is the source of truth for all secret values.

## Required Local Variables

- `BRAND_PORTAL_STORAGE_CONNECTION_STRING`
- `BRAND_PORTAL_ADMIN_PASSWORD`
- `BRAND_PORTAL_DEV_ADMIN_PASSWORD` optional break-glass password for Griffin live checks. Store it only in Azure Key Vault / Azure App Settings, never in source control.

## Running Setup

PowerShell:

```powershell
./scripts/setup-secrets.ps1
```

Bash:

```bash
./scripts/setup-secrets.sh
```

The setup script locates a sibling Umbrella checkout, uses UMBRELLA_HOME when provided, or clones https://github.com/Dotslashcrash/Umbrella.git if needed. It runs Umbrella validation and secret pull scripts, then writes this repository's local .env file.

## Missing Secrets

If a required secret is unavailable, setup prints only the missing secret name and prompts interactive developers to add it, skip it for local development, or exit. Non-interactive runs fail with a clear list of missing names. Secret values are never printed.

## Adding a Secret

1. Add the value to Azure Key Vault.
2. Add or confirm the variable mapping in Umbrella/config/secret-map.json.
3. Add the variable name with an empty value to this repository's .env.example.
4. Rerun setup and restart the app.

## Production

Production Azure workloads should use Managed Identity and Azure Key Vault directly. Do not deploy generated .env files.

## Contributor Rules

- Do not commit .env files.
- Do not hardcode credentials.
- Do not print or log secret values.
- Do not include secrets in errors, screenshots, docs, tests, fixtures, or sample files.
- Use safe missing-variable messages such as Missing required environment variable: NAME.
