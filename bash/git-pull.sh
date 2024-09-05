#!/bin/bash

SEARCH_DIR="."

for dir in "$SEARCH_DIR"/*/; do
    # Check if it's a directory
    if [ -d "$dir" ]; then
        echo "Pulling updates in directory: $dir"
        # Navigate into the directory and execute git pull
        (cd "$dir" && git pull)
    fi
done
