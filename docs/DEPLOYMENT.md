# Deployment Guide (Hetzner VPS)

Follow these steps to deploy your application to a Hetzner Cloud Server (VPS).

## 1. Create a Server (Hetzner Cloud)

1.  Log in to your [Hetzner Cloud Console](https://console.hetzner.cloud/).
2.  Click **"New Project"** and give it a name (e.g., "Kedah").
3.  Click **"Add Server"**.
4.  **Location**: Choose a location (e.g., Singapore for better latency in Malaysia, or Germany for cheaper prices).
5.  **Image**: Select **Ubuntu 24.04** (or the latest LTS version).
6.  **Type**: **Shared vCPU** -> **CPX11** (approx €4/month) is usually enough to start.
7.  **SSH Key**: highly recommended to add your SSH key. If not, you will receive a root password via email.
8.  **Name**: Give it a name like `kedah-prod`.
9.  Click **"Create & Buy now"**.

Wait for the IP address to appear.

## 2. Connect to Server

Open your terminal (PowerShell or Git Bash) and SSH into the server:
```bash
ssh root@<YOUR_SERVER_IP>
# If asked for a password, copy it from the email Hetzner sent you.
```

## 3. Initial Server Setup

Run these commands to update the system and install necessary software:

```bash
# Update system
apt update && apt upgrade -y

# Install dependencies (Python, Node.js, Nginx, Git, PostgreSQL)
apt install -y python3-pip python3-venv python3-dev libpq-dev postgresql postgresql-contrib nginx curl

# Install Node.js (Version 18+)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

## 4. PostgreSQL Setup

Create a database and user:

```bash
sudo -u postgres psql
```

Inside the SQL prompt:
```sql
CREATE DATABASE kedah_db;
CREATE USER kedah_user WITH PASSWORD 'your_secure_password';
ALTER ROLE kedah_user SET client_encoding TO 'utf8';
ALTER ROLE kedah_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE kedah_user SET timezone TO 'Asia/Kuala_Lumpur';
GRANT ALL PRIVILEGES ON DATABASE kedah_db TO kedah_user;
ALTER DATABASE kedah_db OWNER TO kedah_user; 
\q
```

## 5. Clone Repository and First Deploy

Navigate to `/var/www` and clone your repo:

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/shukrishariff-oms/kedah.git Kedah
# Note: You might need to generate an SSH key on the server and add it to GitHub, or use HTTPS with a token.
```

**Setup Environment Variables:**
Create the `.env` file in `backend/`:

```bash
cd /var/www/Kedah/backend
nano .env
```
Paste your production settings:
```ini
DEBUG=False
SECRET_KEY=your_production_secret_key
DATABASE_URL=postgres://kedah_user:your_secure_password@localhost/kedah_db
# If using SQLite (simpler): DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=your_domain.com,api.your_domain.com,<YOUR_SERVER_IP>
CORS_ALLOWED_ORIGINS=https://your_domain.com,https://api.your_domain.com
```
*(Press `Ctrl+X`, then `Y`, then `Enter` to save)*

**Run Deployment Script (First Time):**
We first need to make the script executable.

```bash
chmod +x /var/www/Kedah/scripts/deploy.sh
/var/www/Kedah/scripts/deploy.sh
```

## 6. Configure Nginx and Gunicorn

Copy the configuration files we prepared:

```bash
# 1. Setup Gunicorn Service
cp /var/www/Kedah/gunicorn.service /etc/systemd/system/
systemctl start gunicorn
systemctl enable gunicorn

# 2. Setup Nginx
cp /var/www/Kedah/nginx.conf /etc/nginx/sites-available/kedah
# Edit the file to update YOUR_DOMAIN_OR_IP
nano /etc/nginx/sites-available/kedah 
# (Replace YOUR_DOMAIN_OR_IP with your actual IP or Domain)

ln -s /etc/nginx/sites-available/kedah /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t  # Test config
systemctl restart nginx
```

## 7. Point Domain (DNS)

Go to your Domain Registrar (e.g., Godaddy, Namecheap) and manage DNS:
- Add an **A Record** for `@` pointing to `<YOUR_SERVER_IP>`.
- Add an **A Record** for `www` pointing to `<YOUR_SERVER_IP>`.

## 8. HTTPS (SSL) Setup

Secure your site with Certbot:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com -d www.your_domain.com
```

---
**Done!** Your site should now be live.
To update the site in the future, just run:
```bash
/var/www/Kedah/scripts/deploy.sh
```
