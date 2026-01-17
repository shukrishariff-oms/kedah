# Coolify Installation Guide

Coolify is an open-source, self-hostable Heroku/Vercel alternative that makes managing your apps much easier.

## Option A: Fresh Start (Recommended)
Since we just created the server, the cleanest way is to **Rebuild** it. This ensures no conflicts.

1.  Go to **Hetzner Cloud Console**.
2.  Select your server (`infokedah-vps`).
3.  Go to the **Rebuild** tab (left menu).
4.  Select **Ubuntu 24.04**.
5.  Click **Rebuild**.
    *   *Note: This will delete everything on the server, but your code is safe on GitHub.*
    *   *You will get a NEW root password via email (unless you use SSH keys).*

## Option B: Install on Existing Setup
If you don't want to rebuild, we must stop the manual services we created to free up the ports.

Run this in your terminal to stop Nginx and Gunicorn:
```bash
systemctl stop nginx gunicorn
systemctl disable nginx gunicorn
```

---

## 1. Install Coolify
Once you have a fresh (or cleaned) server, SSH into it:

```bash
ssh root@91.99.142.54
```

**Run the installation command:**
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

*This typically takes 5-10 minutes.*

## 2. Access Dashboard
Once the installation finishes, it will show you the URL and credentials.

1.  Open your browser and visit: `http://91.99.142.54:8000`
2.  Register your Administrator account.

## 3. Deploy Your App
1.  **Create a Project**: Click "+ Create Project".
2.  **Select Resource**: Choose "Git Repository" (Public or Private).
3.  **Connect GitHub**: You might need to add the Coolify Deployment Key to your GitHub Repo Settings -> Deploy Keys.
    *   *Or just use HTTPS URL for public repo: `https://github.com/shukrishariff-oms/kedah.git`*
4.  **Configuration**:
    *   **Build Pack**: Nixpacks (Recommended) or Dockerfile.
    *   **Environment Variables**: Copy them from your local `.env`.
        *   `DEBUG=False`
        *   `DATABASE_URL` (Coolify can provision a Postgres DB for you! See below).
        *   `ALLOWED_HOSTS=...`

## 4. Add Database (Postgres)
1.  In your environment, click "+ Add Resource".
2.  Select **PostgreSQL**.
3.  Click "Start".
4.  Copy the connection string (`postgres://...`) and paste it into your App's Environment Variables as `DATABASE_URL`.

## 5. Domain Setup
1.  In your App settings, go to **General**.
2.  Set **Domains** to `https://infokedah.ohmaishoot.com`.
3.  Coolify will automatically handle the SSL (HTTPS) for you! (Make sure your DNS A Record points to the IP).
