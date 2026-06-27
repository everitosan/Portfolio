#!/bin/bash
set -e

## Global colors
RED="\e[31m";
GREEN="\e[32m";
YELLOW="\e[33m"
BLUE="\e[34m";
PURPLE="\e[35m"
GRAY="\e[1;30m";
RESET="\e[0m";

# Global variables
RELEASES_DIR="releases"
RELEASE_NAME="build.7z"
REMOTE_HOST="eve-dev"

echo -e "${BLUE}🚀 Starting deployment process...${RESET}"

# Load asdf locally
if [ -f "$HOME/.asdfrc" ]; then
  source "$HOME/.asdfrc"
fi

if [ -f "$HOME/.asdf/asdf.sh" ]; then
  source "$HOME/.asdf/asdf.sh"
fi

# Verify Node.js and pnpm are available
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js not found. Please install with asdf.${RESET}"
  exit 1
fi

if ! command -v pnpm &> /dev/null; then
  echo -e "${RED}❌ pnpm not found. Installing...${RESET}"
  npm install -g pnpm
fi

echo -e "${YELLOW}📦 Installing dependencies with pnpm...${RESET}"
pnpm install

echo -e "${YELLOW}🔨 Building web application...${RESET}"
pnpm -F web build

if [ ! -d "apps/web/build" ]; then
  echo -e "${RED}❌ Build failed: apps/web/build not found${RESET}"
  exit 1
fi

# Create releases directory if it doesn't exist
if [ ! -d "${RELEASES_DIR}" ]; then
  mkdir -p "${RELEASES_DIR}"
fi

echo -e "${YELLOW}📦 Creating package ${RELEASE_NAME}...${RESET}"
cd apps/web/build
7z a "${RELEASE_NAME}" . > /dev/null 2>&1
mv "${RELEASE_NAME}" ../../../${RELEASES_DIR}/
cd ../../../
size=$(ls -lah "${RELEASES_DIR}" | grep "${RELEASE_NAME}" | awk '{print $5}')
echo -e "${YELLOW}📦 Package of ${size} created${RESET}"

echo -e "${YELLOW}📤 Uploading to remote server...${RESET}"
scp "./${RELEASES_DIR}/${RELEASE_NAME}" "${REMOTE_HOST}:~/${RELEASE_NAME}"

echo -e "${YELLOW}🔄 Updating remote server...${RESET}"
ssh "${REMOTE_HOST}" bash << 'EOF'
set -e
TIMESTAMP=$(date +"%Y-%m-%d__%H-%M-%S")
RELEASE_NAME="build.7z"

# Move file from home to /var/www/html with sudo
sudo mv ~/"${RELEASE_NAME}" /var/www/html/everitosan.7z

cd /var/www/html
sudo mv everitosan "everitosan__$TIMESTAMP"
sudo mkdir everitosan
sudo mv everitosan.7z everitosan
cd everitosan
sudo 7z x everitosan.7z
sudo rm everitosan.7z

echo "✅ Deployment complete at $TIMESTAMP"
EOF

echo -e "${GREEN}✅ Deployment finished successfully!${RESET}"