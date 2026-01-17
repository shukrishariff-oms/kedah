#!/bin/bash
set -e

echo "🔧 Setting up Gunicorn..."
# Copy service file
cp /var/www/Kedah/gunicorn.service /etc/systemd/system/
# Reload systemd to recognize new service
systemctl daemon-reload
# Start and enable
systemctl start gunicorn
systemctl enable gunicorn
echo "✅ Gunicorn started."

echo "🔧 Setting up Nginx..."
# Copy config
cp /var/www/Kedah/nginx.conf /etc/nginx/sites-available/kedah
# Enable site (symlink)
ln -sf /etc/nginx/sites-available/kedah /etc/nginx/sites-enabled/
# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default
# Test config
nginx -t
# Restart Nginx
systemctl restart nginx
echo "✅ Nginx started."

echo "🎉 Configuration Complete! Your site should be running on HTTP."
echo "➡️  Next step: Run 'certbot --nginx' to setup HTTPS."
