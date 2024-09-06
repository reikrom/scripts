#!/bin/bash

# Outputs stats on languages and tech used in each folder.

SEARCH_DIR="."
# Change /stack to whatever
OUTPUT_DIR="${SEARCH_DIR}/stack"


if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir "$OUTPUT_DIR"
fi

# Loop through each directory in the search directory
for dir in "$SEARCH_DIR"/*/; do
    # Check if it's a directory
    if [ -d "$dir" ]; then
        dir_name=$(basename "$dir")
        (npx @specfy/stack-analyser ./"$dir_name" --output="$OUTPUT_DIR"/"$dir_name"-stack.json)
    fi
done

