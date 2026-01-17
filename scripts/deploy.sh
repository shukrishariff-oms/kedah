#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Directory variables
PROJECT_DIR="/var/www/Kedah"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# 1. Pull latest code
echo "📦 Pulling latest code..."
cd $PROJECT_DIR
git pull origin main

# 2. Setup Backend
echo "🐍 Setting up Backend..."
cd $BACKEND_DIR
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# 3. Setup Frontend
echo "⚛️ Setting up Frontend..."
cd $FRONTEND_DIR
npm install
npm run build

# 4. Restart Services
echo "🔄 Restarting services..."
systemctl restart gunicorn
systemctl restart nginx

echo "✅ Deployment complete!"
