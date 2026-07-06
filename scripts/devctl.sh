#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "nvm introuvable dans $NVM_DIR" >&2
  exit 1
fi

unset npm_config_prefix
unset NPM_CONFIG_PREFIX
source "$NVM_DIR/nvm.sh"
nvm use >/dev/null

cd "$PROJECT_DIR"
exec ./node_modules/.bin/astro dev "$@"
