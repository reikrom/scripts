#!/bin/sh

# map over repo list availabble through gh repo list, limit up to 4000
gh repo list <Orgname> --limit 10 --json nameWithOwner --jq '.[].nameWithOwner' | \
   parallel -j 5 'gh repo clone {} ./{}'

