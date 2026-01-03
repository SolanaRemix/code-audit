#!/bin/bash
# CodeAudit.sh Setup Script
# Initializes the development environment

set -e

echo "🔧 Setting up CodeAudit.sh..."

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Error: Node.js 18 or higher is required"
  exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment file
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cp .env.example .env
  echo "⚠️  Please update .env with your GitHub App credentials"
else
  echo "ℹ️  .env file already exists"
fi

# Create directories
echo "📁 Creating directories..."
mkdir -p logs tmp

# Check for required tools
echo "🔍 Checking for audit tools..."

check_tool() {
  if command -v $1 &> /dev/null; then
    echo "  ✅ $1 is installed"
  else
    echo "  ⚠️  $1 is not installed (optional)"
  fi
}

check_tool "eslint"
check_tool "prettier"
check_tool "shellcheck"
check_tool "bandit"
check_tool "semgrep"

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your GitHub App credentials"
echo "2. Run 'npm start' to start the app"
echo "3. Visit https://smee.io to get a webhook proxy URL"
echo ""
