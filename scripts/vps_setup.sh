#!/bin/bash
set -e

echo "📦 Installing Dependencies (htop, fail2ban, cockpit)..."
apt update && apt install -y htop fail2ban cockpit

echo "🐋 Checking Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
else
    echo "Docker already installed."
fi

echo "🛡️ Configuring Firewall (UFW)..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # Custom App Port
ufw allow 8000/tcp  # Coolify Dashboard
ufw allow 9090/tcp  # Cockpit Web UI

echo "⚠️  Enabling UFW..."
echo "y" | ufw enable

echo "🚀 Starting Cockpit..."
systemctl enable --now cockpit.socket

echo "✅ Setup Complete!"
echo "➡️  Cockpit: https://$(curl -s ifconfig.me):9090"
echo "➡️  Coolify: http://$(curl -s ifconfig.me):8000"
