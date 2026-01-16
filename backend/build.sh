#!/usr/bin/env bash
# exit on error
set -o errexit

# Change directory to backend where requirements.txt and manage.py are located
cd backend

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
