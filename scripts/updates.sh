#!/bin/bash
# Update script for CodeAudit.sh
# Updates dependencies and tools

set -e

echo "🔄 Updating CodeAudit.sh..."

# Update Node.js dependencies
echo "📦 Updating Node.js dependencies..."
npm update

echo ""
echo "Checking for outdated packages..."
npm outdated || true

echo ""
echo "✅ Update complete!"
echo ""
echo "To update to latest versions, run:"
echo "  npm install <package>@latest"
echo ""
echo "To check for security vulnerabilities, run:"
echo "  npm audit"
echo ""
