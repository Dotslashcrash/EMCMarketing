#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
UMBRELLA_REPOSITORY="${UMBRELLA_REPOSITORY:-https://github.com/Dotslashcrash/Umbrella.git}"
UMBRELLA_ROOT="${UMBRELLA_HOME:-}"
NON_INTERACTIVE="${NON_INTERACTIVE:-}"
REQUIRED_VARIABLES=(
  "GOOGLE_CHAT_WEBHOOK_URL"
)

info() {
  printf '[umbrella] %s\n' "$1" >&2
}

fail() {
  printf '[umbrella] ERROR: %s\n' "$1" >&2
  exit 1
}

find_umbrella() {
  if [[ -n "$UMBRELLA_ROOT" && -f "$UMBRELLA_ROOT/scripts/pull-secrets.sh" ]]; then
    printf '%s\n' "$UMBRELLA_ROOT"
    return
  fi

  local sibling
  sibling="$(cd "$PROJECT_ROOT/.." && pwd)/Umbrella"
  if [[ -f "$sibling/scripts/pull-secrets.sh" ]]; then
    printf '%s\n' "$sibling"
    return
  fi

  command -v git >/dev/null 2>&1 || fail "Umbrella was not found and Git is not installed. Clone $UMBRELLA_REPOSITORY or set UMBRELLA_HOME."
  info "Umbrella was not found beside this repository. Cloning shared framework."
  git clone "$UMBRELLA_REPOSITORY" "$sibling"
  printf '%s\n' "$sibling"
}

has_env_name() {
  local name="$1"
  local env_path="$PROJECT_ROOT/.env"
  [[ -f "$env_path" ]] || return 1
  grep -Eq "^[[:space:]]*$name=." "$env_path"
}

handle_missing_required_secret() {
  local name="$1"
  printf '\nMissing required secret: %s\n\n' "$name"
  printf 'This secret was not found in Azure Key Vault.\n\n'
  printf 'Options:\n'
  printf '1. Add the secret to Azure Key Vault now.\n'
  printf '2. Skip for local development.\n'
  printf '3. Exit setup.\n\n'
  printf 'No secret value will be printed or stored in Git.\n'

  if [[ -n "$NON_INTERACTIVE" || ! -t 0 ]]; then
    return 3
  fi

  read -r -p "Choose 1, 2, or 3: " choice
  case "$choice" in
    1) return 1 ;;
    2) return 2 ;;
    *) return 3 ;;
  esac
}

UMBRELLA_ROOT="$(find_umbrella)"
info "Using Umbrella at $UMBRELLA_ROOT"

"$UMBRELLA_ROOT/scripts/validate-env.sh"
OUTPUT_PATH="$PROJECT_ROOT/.env" "$UMBRELLA_ROOT/scripts/pull-secrets.sh"

missing=()
for required in "${REQUIRED_VARIABLES[@]}"; do
  if ! has_env_name "$required"; then
    missing+=("$required")
  fi
done

skipped=()
for name in "${missing[@]}"; do
  set +e
  handle_missing_required_secret "$name"
  action="$?"
  set -e
  if [[ "$action" == "2" ]]; then
    skipped+=("$name")
    continue
  fi
  if [[ "$action" == "1" ]]; then
    printf 'Add %s to Azure Key Vault and Umbrella config/secret-map.json, then rerun this setup script.\n' "$name"
  fi
  fail "Missing required secrets: ${missing[*]}"
done

if [[ "${#skipped[@]}" -gt 0 ]]; then
  info "Skipped local-only secrets: ${skipped[*]}"
fi

info "Local .env is ready at $PROJECT_ROOT/.env. Secret values were not printed."


