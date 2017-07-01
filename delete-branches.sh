#!/bin/bash

# command will be run like ./get-branches --directory /path/to/folder --branches "branch1 branch2 etc"
# so args are:
# $0 is ./get-branches
# $1 is --directory
# $2 is /path/to/folder
# $3 is --branches
# $4 is "branch1 branch2"

cd $2 && git branch -D $4