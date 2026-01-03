#!/bin/bash
# CodeAudit.sh Configuration Management Script
# Manages configuration files

echo "⚙️  CodeAudit.sh Configuration Manager"
echo ""

if [ -z "$1" ]; then
  echo "Available commands:"
  echo "  show     - Show current configuration"
  echo "  validate - Validate configuration"
  echo "  reset    - Reset to defaults"
  echo ""
  echo "Usage: $0 <command>"
  exit 1
fi

COMMAND=$1

case "$COMMAND" in
  show)
    echo "Current Configuration:"
    echo ""
    if [ -f .env ]; then
      echo "Environment Variables (.env):"
      cat .env | grep -v "^#" | grep -v "^$"
    else
      echo "⚠️  No .env file found"
    fi
    echo ""
    ;;
    
  validate)
    echo "Validating configuration..."
    
    # Check .env
    if [ ! -f .env ]; then
      echo "❌ Missing .env file"
      exit 1
    fi
    
    # Check required variables
    REQUIRED_VARS=("APP_ID" "WEBHOOK_SECRET")
    for VAR in "${REQUIRED_VARS[@]}"; do
      if ! grep -q "^$VAR=" .env; then
        echo "❌ Missing required variable: $VAR"
        exit 1
      fi
    done
    
    echo "✅ Configuration is valid"
    ;;
    
  reset)
    echo "⚠️  This will reset configuration to defaults"
    read -p "Are you sure? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      cp .env.example .env
      echo "✅ Configuration reset to defaults"
      echo "⚠️  Please update .env with your credentials"
    fi
    ;;
    
  *)
    echo "❌ Unknown command: $COMMAND"
    exit 1
    ;;
esac
