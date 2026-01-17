#!/bin/bash
set -e

# Apply Migrations
echo "📦 Applying Database Migrations..."
cd /app/backend
python manage.py migrate

# Start Gunicorn (Background)
echo "🦄 Starting Gunicorn..."
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --daemon

# Start Nginx (Foreground)
echo "🕸️ Starting Nginx..."
nginx -g "daemon off;"
