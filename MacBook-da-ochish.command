#!/bin/zsh

set -e
unsetopt bg_nice

SCRIPT_DIR="${0:A:h}"
cd "$SCRIPT_DIR"

if [[ ! -f "dist/index.html" ]]; then
  if ! command -v npm >/dev/null 2>&1; then
    echo "Web versiya hali yig‘ilmagan va Node.js topilmadi."
    echo "Node.js 20.19 yoki yangirog‘ini o‘rnating, keyin qayta urinib ko‘ring:"
    echo "https://nodejs.org/"
    echo
    read "?Yopish uchun Enter bosing..."
    exit 1
  fi

  echo "MacBook uchun web versiya yig‘ilmoqda..."
  npm run build:web
fi

PYTHON_BIN=""
for candidate in /opt/homebrew/bin/python3 /usr/local/bin/python3 /usr/bin/python3; do
  if [[ -x "$candidate" ]]; then
    PYTHON_BIN="$candidate"
    break
  fi
done

if [[ -z "$PYTHON_BIN" ]]; then
  echo "Python 3 topilmadi. Terminalda 'npm run mac' buyrug‘idan foydalaning."
  echo
  read "?Yopish uchun Enter bosing..."
  exit 1
fi

PORT=4173
URL="http://127.0.0.1:${PORT}"

echo "Nemischa 0 dan MacBook’da ishga tushmoqda: $URL"
echo "Ilovani to‘xtatish uchun Control + C ni bosing."

(sleep 1; open "$URL") &
exec "$PYTHON_BIN" -m http.server "$PORT" --bind 127.0.0.1 --directory dist
