#!/bin/bash
set -euo pipefail

# Only relevant in Claude Code on the web / remote sessions.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# The playwright MCP browser tool expects a real Chrome binary at
# /opt/google/chrome/chrome. It is not preinstalled in fresh containers,
# so install it on every session start (idempotent — no-op if already present).
if [ ! -x /opt/google/chrome/chrome ]; then
  npx --yes playwright install chrome
fi
