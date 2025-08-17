#!/bin/bash

## Global colors
RED="\e[31m";
GREEN="\e[32m";
YELLOW="\e[33m"
BLUE="\e[34m";
PURPLE="\e[35m"
GRAY="\e[1;30m";
RESET="\e[0m";


# Global variables
RELEASES_DIR="releases";
RELEASE_NAME="build.7z";
DST_DIR="/var/www/html/";

scp "./${RELEASES_DIR}/${RELEASE_NAME}" iox:/var/www/html/prezento.7z;

ssh iox bash << 'EOF'
TIMESTAMP=$(date +"%Y-%m-%d__%H-%M-%S");

cd /var/www/html;
mv prezento "prezento__$TIMESTAMP";
mkdir prezento;
mv prezento.7z prezento;
cd prezento;
7z x prezento.7z;
rm prezento.7z;
EOF