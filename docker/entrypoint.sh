#!/bin/bash
set -e

# Setup Media Directory
echo "📂 Setting up Media directory..."
mkdir -p /app/backend/media
chmod -R 777 /app/backend/media

# Apply Migrations
echo "📦 Applying Database Migrations..."
cd /app/backend
python manage.py migrate
echo "👤 Seeding Admin User..."
python seed_admin.py

# Start Gunicorn (Background)
echo "🦄 Starting Gunicorn..."
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --daemon

# Start Nginx (Foreground)
echo "🕸️ Starting Nginx..."
nginx -g "daemon off;"
