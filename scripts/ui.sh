#!/bin/bash
# CodeAudit.sh UI Management Script
# Manages UI-related operations

echo "🎨 CodeAudit.sh UI Manager"
echo ""
echo "Available commands:"
echo "  status  - Check UI status"
echo "  logs    - View application logs"
echo "  monitor - Monitor in real-time"
echo ""

if [ -z "$1" ]; then
  echo "Usage: $0 <command>"
  exit 1
fi

COMMAND=$1

case "$COMMAND" in
  status)
    echo "📊 Application Status:"
    if pgrep -f "probot run" > /dev/null; then
      echo "  ✅ Application is running"
    else
      echo "  ❌ Application is not running"
    fi
    ;;
    
  logs)
    echo "📋 Recent Logs:"
    if [ -f logs/app.log ]; then
      tail -n 50 logs/app.log
    else
      echo "No logs found"
    fi
    ;;
    
  monitor)
    echo "👀 Monitoring application (Ctrl+C to exit)..."
    if [ -f logs/app.log ]; then
      tail -f logs/app.log
    else
      echo "No logs found. Is the application running?"
    fi
    ;;
    
  *)
    echo "❌ Unknown command: $COMMAND"
    exit 1
    ;;
esac
