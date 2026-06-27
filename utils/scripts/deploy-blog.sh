#!/bin/bash

RED="\e[31m"; GREEN="\e[32m"; YELLOW="\e[33m"; RESET="\e[0m"

DST_DIR="/home/ubuntu/apps/blog"
SERVER="eve-dev"

# Cargar asdf para que node y pnpm estén disponibles
. "${HOME}/.asdf/asdf.sh"

echo -e "${YELLOW}Building blog...${RESET}"
pnpm exec turbo run build --filter=blog

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed${RESET}"
  exit 1
fi

echo -e "${YELLOW}Uploading to server...${RESET}"
rsync -az --delete apps/blog/dist/ "${SERVER}":${DST_DIR}/dist/
rsync -az apps/blog/pm2.config.cjs "${SERVER}":${DST_DIR}/

if [ $? -ne 0 ]; then
  echo -e "${RED}Upload failed${RESET}"
  exit 1
fi

echo -e "${YELLOW}Restarting PM2...${RESET}"
ssh "${SERVER}" bash << 'EOF'
  export NVM_DIR="$HOME/.nvm"
  . "$NVM_DIR/nvm.sh"
  cd /home/ubuntu/apps/blog
  pm2 describe blog > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    pm2 restart blog
  else
    pm2 start pm2.config.cjs
    pm2 save
  fi
EOF

echo -e "${GREEN}Blog deployed!${RESET}"
