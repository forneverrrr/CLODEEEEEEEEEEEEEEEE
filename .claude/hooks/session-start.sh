#!/bin/bash
set -euo pipefail

# Ставит agent-reach (https://github.com/Panniantong/Agent-Reach), если его ещё
# нет. Проверено на безопасность 01.08.2026: 64k звёзд (подтверждено независимо
# через shields.io), в коде нет eval/exec/os.system/shell=True, внешние URL —
# только известные сервисы (GitHub, Node.js, gh CLI, Groq, Exa MCP), телеметрии
# нет. Ставим только базовый пакет с PyPI — без системных пакетов и без
# подключения каналов соцсетей (это отдельное решение с куки аккаунтов).

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v agent-reach >/dev/null 2>&1; then
  pip3 install --user --quiet agent-reach
fi

export PATH="$PATH:$HOME/.local/bin"
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PATH="$PATH:$HOME/.local/bin"' >> "$CLAUDE_ENV_FILE"
fi
