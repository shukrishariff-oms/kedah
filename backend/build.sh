#!/usr/bin/env bash
# exit on error
set -o errexit

# Change directory to backend where requirements.txt and manage.py are located
cd backend

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# --- SEEDING (ONE TIME RUN) ---
# Un-comment these lines to seed data, then re-comment them next deploy
python ../scripts/seed_data.py
python ../scripts/seed_politics_full.py
python ../scripts/create_superuser.py
# ------------------------------
