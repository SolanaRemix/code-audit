#!/bin/bash
# Setup script for CodeAudit.sh
# Performs initial setup and configuration

set -e

echo "🚀 Setting up CodeAudit.sh..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18.0.0 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18.0.0 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your GitHub App credentials"
else
    echo "✅ .env file already exists"
fi

# Create logs directory
if [ ! -d logs ]; then
    echo "📁 Creating logs directory..."
    mkdir -p logs
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your GitHub App credentials:"
echo "   - APP_ID"
echo "   - PRIVATE_KEY (path to .pem file)"
echo "   - WEBHOOK_SECRET"
echo ""
echo "2. Start the app:"
echo "   npm start"
echo ""
echo "For development with auto-reload:"
echo "   npm run dev"
echo ""
