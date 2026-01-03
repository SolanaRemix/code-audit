#!/bin/bash
# CodeAudit.sh Installation Script
# Installs dependencies and audit tools

set -e

echo "📦 Installing CodeAudit.sh and audit tools..."

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Detect OS
OS="$(uname -s)"
echo "Detected OS: $OS"

# Install audit tools based on OS
case "$OS" in
  Linux*)
    echo "Installing tools for Linux..."
    
    # Update package list
    if command -v apt-get &> /dev/null; then
      sudo apt-get update
      
      # Install ShellCheck
      sudo apt-get install -y shellcheck
      
      # Install Python tools
      if command -v pip3 &> /dev/null; then
        pip3 install --user bandit pylint
      fi
    fi
    ;;
    
  Darwin*)
    echo "Installing tools for macOS..."
    
    # Install Homebrew if not present
    if ! command -v brew &> /dev/null; then
      echo "Homebrew not found. Please install from https://brew.sh"
    else
      # Install ShellCheck
      brew install shellcheck
      
      # Install Python tools
      if command -v pip3 &> /dev/null; then
        pip3 install --user bandit pylint
      fi
    fi
    ;;
    
  *)
    echo "⚠️  Unsupported OS: $OS"
    echo "Please install audit tools manually"
    ;;
esac

# Install Semgrep (cross-platform)
if command -v pip3 &> /dev/null; then
  echo "Installing Semgrep..."
  pip3 install --user semgrep
fi

# Install Node.js based tools
# Note: Tools are already available via npx from package.json devDependencies
# Only install globally if you prefer global access
echo "Node.js based tools (ESLint, Prettier) are available via npx"
echo "To install globally (optional): npm install -g eslint prettier"

echo ""
echo "✅ Installation complete!"
echo ""
echo "Installed tools:"
command -v eslint && echo "  ✅ ESLint"
command -v prettier && echo "  ✅ Prettier"
command -v shellcheck && echo "  ✅ ShellCheck"
command -v bandit && echo "  ✅ Bandit"
command -v semgrep && echo "  ✅ Semgrep"
echo ""
