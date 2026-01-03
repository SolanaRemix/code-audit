#!/bin/bash
# CodeAudit.sh Deployment Script
# Deploys the application to various platforms

set -e

echo "🚀 Deploying CodeAudit.sh..."

# Check for deployment target
if [ -z "$1" ]; then
  echo "Usage: $0 <target>"
  echo "Targets: vercel, heroku, docker"
  exit 1
fi

TARGET=$1

case "$TARGET" in
  vercel)
    echo "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
      echo "Installing Vercel CLI..."
      npm install -g vercel
    fi
    
    vercel --prod
    ;;
    
  heroku)
    echo "Deploying to Heroku..."
    
    if ! command -v heroku &> /dev/null; then
      echo "❌ Heroku CLI not found. Please install from https://devcenter.heroku.com/articles/heroku-cli"
      exit 1
    fi
    
    # Create Heroku app if needed
    if ! heroku apps:info &> /dev/null; then
      echo "Creating Heroku app..."
      heroku create
    fi
    
    # Set environment variables
    echo "Setting environment variables..."
    heroku config:set NODE_ENV=production
    
    # Deploy
    git push heroku main
    ;;
    
  docker)
    echo "Building Docker image..."
    
    if ! command -v docker &> /dev/null; then
      echo "❌ Docker not found. Please install Docker."
      exit 1
    fi
    
    docker build -t codeaudit-sh .
    echo "✅ Docker image built: codeaudit-sh"
    echo "Run with: docker run -p 3000:3000 --env-file .env codeaudit-sh"
    ;;
    
  *)
    echo "❌ Unknown target: $TARGET"
    echo "Available targets: vercel, heroku, docker"
    exit 1
    ;;
esac

echo ""
echo "✅ Deployment to $TARGET complete!"
echo ""
