#!/bin/bash
# CodeAudit.sh Network Utilities Script
# Network diagnostics and utilities

echo "🌐 CodeAudit.sh Network Utilities"
echo ""

if [ -z "$1" ]; then
  echo "Available commands:"
  echo "  test     - Test network connectivity"
  echo "  webhook  - Test webhook connectivity"
  echo "  github   - Test GitHub API connectivity"
  echo ""
  echo "Usage: $0 <command>"
  exit 1
fi

COMMAND=$1

case "$COMMAND" in
  test)
    echo "Testing network connectivity..."
    
    # Test internet
    if ping -c 1 github.com &> /dev/null; then
      echo "  ✅ Internet connection: OK"
    else
      echo "  ❌ Internet connection: Failed"
    fi
    
    # Test GitHub API
    if curl -s https://api.github.com > /dev/null; then
      echo "  ✅ GitHub API: OK"
    else
      echo "  ❌ GitHub API: Failed"
    fi
    ;;
    
  webhook)
    echo "Testing webhook connectivity..."
    
    if [ -f .env ]; then
      WEBHOOK_URL=$(grep WEBHOOK_PROXY_URL .env | cut -d'=' -f2)
      if [ -n "$WEBHOOK_URL" ]; then
        if curl -s "$WEBHOOK_URL" > /dev/null; then
          echo "  ✅ Webhook proxy: OK"
        else
          echo "  ❌ Webhook proxy: Failed"
        fi
      else
        echo "  ⚠️  No webhook proxy URL configured"
      fi
    fi
    ;;
    
  github)
    echo "Testing GitHub API connectivity..."
    
    # Test rate limit
    RATE_LIMIT=$(curl -s https://api.github.com/rate_limit | jq -r '.rate.remaining')
    if [ -n "$RATE_LIMIT" ]; then
      echo "  ✅ GitHub API: OK"
      echo "  📊 Rate limit remaining: $RATE_LIMIT"
    else
      echo "  ❌ GitHub API: Failed"
    fi
    ;;
    
  *)
    echo "❌ Unknown command: $COMMAND"
    exit 1
    ;;
esac
