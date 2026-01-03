#!/bin/bash
# Install script for CodeAudit.sh
# Installs dependencies and optional analysis tools

set -e

echo "📦 Installing CodeAudit.sh dependencies..."

# Install Node.js dependencies
echo "Installing Node.js packages..."
npm install

echo ""
echo "✅ Core dependencies installed!"
echo ""
echo "Optional: Install static analysis tools for enhanced functionality:"
echo ""
echo "JavaScript/TypeScript:"
echo "  npm install -g eslint jshint"
echo ""
echo "Python:"
echo "  pip install pylint flake8 bandit mypy"
echo ""
echo "Go:"
echo "  go install golang.org/x/lint/golint@latest"
echo "  go install github.com/securego/gosec/v2/cmd/gosec@latest"
echo ""
echo "Rust:"
echo "  rustup component add clippy"
echo ""
echo "Ruby:"
echo "  gem install rubocop brakeman"
echo ""
echo "PHP:"
echo "  composer global require squizlabs/php_codesniffer"
echo "  composer global require vimeo/psalm"
echo ""
