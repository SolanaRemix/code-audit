#!/bin/bash
# CodeAudit.sh API Utilities Script
# Utilities for API operations

echo "🌐 CodeAudit.sh API Utilities"
echo ""

if [ -z "$1" ]; then
  echo "Available commands:"
  echo "  health   - Check API health"
  echo "  test     - Test webhook"
  echo "  info     - Show API information"
  echo ""
  echo "Usage: $0 <command>"
  exit 1
fi

COMMAND=$1
PORT=${PORT:-3000}
HOST=${HOST:-localhost}

case "$COMMAND" in
  health)
    echo "Checking API health..."
    curl -s "http://$HOST:$PORT/health" | jq . || echo "API not responding"
    ;;
    
  test)
    echo "Testing webhook..."
    echo "Note: Requires SMEE_URL in .env"
    echo "Visit https://smee.io to create a webhook proxy"
    ;;
    
  info)
    echo "API Information:"
    echo "  Host: $HOST"
    echo "  Port: $PORT"
    echo "  Health endpoint: http://$HOST:$PORT/health"
    echo "  Webhook endpoint: http://$HOST:$PORT/api/github/webhooks"
    ;;
    
  *)
    echo "❌ Unknown command: $COMMAND"
    exit 1
    ;;
esac
