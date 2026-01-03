#!/bin/bash
# Deploy script for CodeAudit.sh
# Deploys the app to various platforms

set -e

echo "🚀 Deploying CodeAudit.sh..."

# Detect deployment target
DEPLOY_TARGET="${1:-vercel}"

case "$DEPLOY_TARGET" in
  vercel)
    echo "📦 Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    if [ -n "$VERCEL_TOKEN" ]; then
        vercel --token="$VERCEL_TOKEN" --prod
    else
        vercel --prod
    fi
    
    echo "✅ Deployed to Vercel"
    ;;
    
  heroku)
    echo "📦 Deploying to Heroku..."
    
    if ! command -v heroku &> /dev/null; then
        echo "❌ Heroku CLI not found. Please install it first."
        exit 1
    fi
    
    # Deploy to Heroku
    git push heroku main
    
    echo "✅ Deployed to Heroku"
    ;;
    
  docker)
    echo "📦 Building Docker image..."
    
    docker build -t codeaudit-sh .
    
    echo "✅ Docker image built"
    echo "To run: docker run -p 3000:3000 --env-file .env codeaudit-sh"
    ;;
    
  *)
    echo "❌ Unknown deployment target: $DEPLOY_TARGET"
    echo "Supported targets: vercel, heroku, docker"
    exit 1
    ;;
esac

echo ""
echo "🎉 Deployment complete!"
