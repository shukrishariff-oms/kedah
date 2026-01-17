FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    nodejs \
    npm \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set up work directory
WORKDIR /app

# Copy Project
COPY . .

# Backend Setup
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt
RUN python manage.py collectstatic --noinput

# Frontend Setup
WORKDIR /app/frontend
RUN npm install && npm run build

# Nginx Configuration
# Copy our custom config to the default site location
COPY docker/nginx.conf /etc/nginx/sites-available/default

# Entrypoint
COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose port 80
EXPOSE 80

# Start
ENTRYPOINT ["/app/entrypoint.sh"]
