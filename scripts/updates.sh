#!/bin/bash
# CodeAudit.sh Updates Script
# Checks for and applies updates

set -e

echo "🔄 CodeAudit.sh Update Manager"
echo ""

# Check for git updates
echo "Checking for updates..."
git fetch origin

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "✅ CodeAudit.sh is up to date"
elif [ "$LOCAL" = "$BASE" ]; then
  echo "⬆️  Updates available!"
  echo ""
  read -p "Do you want to update? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Updating..."
    git pull origin main
    
    echo "Installing updated dependencies..."
    npm install
    
    echo "✅ Update complete!"
  fi
elif [ "$REMOTE" = "$BASE" ]; then
  echo "⚠️  Local changes detected. Please commit or stash them first."
else
  echo "⚠️  Branches have diverged. Please resolve manually."
fi

# Check npm packages
echo ""
echo "Checking for npm package updates..."
npm outdated || true

echo ""
echo "To update npm packages, run: npm update"
echo ""
