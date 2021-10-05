#!/bin/bash
set -eu
DEST="dist/redmine-delo.user.js"

# нужно, чтобы cat src/* выдал файлы в нужном порядке
export LC_ALL=C

# build from src/
rm -rf dist && mkdir dist
cat src/* > "$DEST"

# version update
version="$(cat package.json | grep '"version": "[0-9]' | cut -d':' -f2  | cut -d'"' -f2)"
echo "$version"
sed -i 's/@version.*/@version        '"${version}"'/g' "$DEST"
