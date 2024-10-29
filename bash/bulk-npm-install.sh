#!/bin/bash
# brew install fzf
# brew install parallel

SEARCH_DIR="."

# Find all package.json files while ignoring node_modules and run npm install in parallel
find "$SEARCH_DIR" -name "package.json" ! -path "*/node_modules/*" | \
parallel -j 13 '
    dir=$(dirname {}) && \
    echo "Running npm install in directory: $dir" && \
    (cd "$dir" && npm install)
'

