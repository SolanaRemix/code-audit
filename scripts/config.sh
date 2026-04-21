#!/bin/bash
# Configuration management script for CodeAudit.sh
# Manages configuration files and settings

set -e

echo "⚙️  CodeAudit.sh Configuration Manager"
echo ""

COMMAND="${1:-help}"

case "$COMMAND" in
  init)
    echo "Initializing configuration..."
    
    # Create .env if it doesn't exist
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Created .env from template"
    else
        echo "⚠️  .env already exists"
    fi
    
    # Create example config
    if [ ! -f .codeaudit.yml ]; then
        cp .codeaudit.example.yml .codeaudit.yml
        echo "✅ Created .codeaudit.yml from template"
    else
        echo "⚠️  .codeaudit.yml already exists"
    fi
    ;;
    
  validate)
    echo "Validating configuration..."
    
    # Check .env file
    if [ -f .env ]; then
        echo "✅ .env exists"
        
        # Check required variables
        if grep -q "APP_ID=" .env && grep -q "PRIVATE_KEY=" .env && grep -q "WEBHOOK_SECRET=" .env; then
            echo "✅ Required variables present"
        else
            echo "⚠️  Some required variables may be missing"
        fi
    else
        echo "❌ .env not found"
    fi
    
    # Check .codeaudit.yml
    if [ -f .codeaudit.yml ]; then
        echo "✅ .codeaudit.yml exists"
    else
        echo "⚠️  .codeaudit.yml not found (optional)"
    fi
    ;;
    
  show)
    echo "Current configuration:"
    echo ""
    
    if [ -f .env ]; then
        echo "=== .env (non-sensitive variables only) ==="
        # Show only safe, non-sensitive environment variables
        grep -E "^(NODE_ENV|PORT|LOG_LEVEL|GHE_HOST)=" .env 2>/dev/null || echo "(no safe variables found)"
        echo ""
        echo "Note: Sensitive variables (keys, secrets, tokens, passwords) are hidden for security."
    fi
    
    if [ -f .codeaudit.yml ]; then
        echo "=== .codeaudit.yml ==="
        head -20 .codeaudit.yml
        echo ""
    fi
    ;;
    
  help|*)
    echo "Usage: ./config.sh [command]"
    echo ""
    echo "Commands:"
    echo "  init     - Initialize configuration files"
    echo "  validate - Validate configuration"
    echo "  show     - Show current configuration"
    echo "  help     - Show this help message"
    echo ""
    ;;
esac
