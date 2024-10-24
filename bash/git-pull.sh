#!/bin/bash
# brew install parallel

SEARCH_DIR="."

find "$SEARCH_DIR" -mindepth 1 -maxdepth 1 -type d | \
parallel -j 13 '
    echo "Pulling updates in directory: {}" && \
    (cd {} && git pull)
'
