#!/bin/bash
# Network diagnostics script for CodeAudit.sh
# Tests network connectivity and webhook configuration

set -e

echo "🌐 CodeAudit.sh Network Diagnostics"
echo ""

COMMAND="${1:-help}"

case "$COMMAND" in
  test)
    echo "Testing network connectivity..."
    echo ""
    
    # Test internet connectivity
    echo "Testing internet connection..."
    if ping -c 1 github.com &> /dev/null; then
        echo "✅ Internet connection OK"
    else
        echo "❌ No internet connection"
    fi
    
    echo ""
    
    # Test GitHub API
    echo "Testing GitHub API..."
    if curl -s https://api.github.com/zen > /dev/null; then
        echo "✅ GitHub API accessible"
        echo "   Response: $(curl -s https://api.github.com/zen)"
    else
        echo "❌ Cannot reach GitHub API"
    fi
    
    echo ""
    
    # Test local app
    echo "Testing local app..."
    if curl -s http://localhost:3000/probot > /dev/null 2>&1; then
        echo "✅ App is running on http://localhost:3000"
    else
        echo "⚠️  App not running on http://localhost:3000"
    fi
    ;;
    
  webhook)
    echo "Testing webhook configuration..."
    echo ""
    
    # Check if WEBHOOK_PROXY_URL is set
    if [ -f .env ] && grep -q "WEBHOOK_PROXY_URL=" .env; then
        PROXY_URL=$(grep "WEBHOOK_PROXY_URL=" .env | cut -d'=' -f2)
        if [ -n "$PROXY_URL" ]; then
            echo "Webhook proxy URL: $PROXY_URL"
            
            # Test webhook proxy
            if curl -s "$PROXY_URL" > /dev/null 2>&1; then
                echo "✅ Webhook proxy accessible"
            else
                echo "⚠️  Cannot reach webhook proxy"
            fi
        else
            echo "⚠️  WEBHOOK_PROXY_URL not set"
        fi
    else
        echo "⚠️  No webhook proxy configured"
    fi
    ;;
    
  ports)
    echo "Checking port availability..."
    echo ""
    
    # Check if port 3000 is in use
    if lsof -i:3000 > /dev/null 2>&1; then
        echo "Port 3000 is in use:"
        lsof -i:3000
    else
        echo "✅ Port 3000 is available"
    fi
    ;;
    
  help|*)
    echo "Usage: ./network.sh [command]"
    echo ""
    echo "Commands:"
    echo "  test    - Test network connectivity"
    echo "  webhook - Test webhook configuration"
    echo "  ports   - Check port availability"
    echo "  help    - Show this help message"
    echo ""
    ;;
esac
