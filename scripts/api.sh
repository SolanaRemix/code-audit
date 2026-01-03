#!/bin/bash
# API management script for CodeAudit.sh
# Manages API testing and monitoring

set -e

echo "🔌 CodeAudit.sh API Manager"
echo ""

COMMAND="${1:-help}"

case "$COMMAND" in
  test)
    echo "Testing API endpoints..."
    
    # Test health endpoint
    echo "Testing health endpoint..."
    curl -s http://localhost:3000/probot || echo "⚠️  App may not be running"
    
    echo ""
    echo "✅ API test complete"
    ;;
    
  webhook)
    echo "Testing webhook endpoint..."
    
    # Test webhook endpoint
    echo "Testing POST to /api/github/webhooks..."
    curl -X POST http://localhost:3000/api/github/webhooks \
      -H "Content-Type: application/json" \
      -d '{"test": true}' || echo "⚠️  App may not be running"
    
    echo ""
    echo "✅ Webhook test complete"
    ;;
    
  monitor)
    echo "Monitoring API..."
    echo "⚠️  Monitoring not yet implemented"
    ;;
    
  help|*)
    echo "Usage: ./api.sh [command]"
    echo ""
    echo "Commands:"
    echo "  test     - Test API endpoints"
    echo "  webhook  - Test webhook endpoint"
    echo "  monitor  - Monitor API health"
    echo "  help     - Show this help message"
    echo ""
    ;;
esac
