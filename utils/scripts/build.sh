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

if [[ ! -d "${RELEASES_DIR}" ]]; then
  echo -e "${YELLOW}▓▒░${RESET} Creating release dir";
  mkdir -p "./${RELEASES_DIR}";
fi

# Compile code
echo -e "${YELLOW}▓▒░${RESET} Compiling with turbo";
. ${HOME}/.nvm/nvm.sh && nvm use && npx turbo run build --filter=web > /dev/null 2>&1;

# Create package
echo -e "${YELLOW}▓▒░${RESET} Creating package ${YELLOW}${RELEASE_NAME}${RESET}";
cd apps/web/build;
7z a "${RELEASE_NAME}" . > /dev/null 2>&1;
mv "${RELEASE_NAME}" ../../../${RELEASES_DIR}/;
cd ../../../;
size=$(ls -lah "${RELEASES_DIR}" | grep "${RELEASE_NAME}" | awk '{print $5}')
echo -e "${YELLOW}▓▒░${RESET} Package of ${YELLOW}${size}${RESET} created";

