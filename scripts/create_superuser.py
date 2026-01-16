import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
import sys
# Fix path for Render: Add backend/ directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/backend')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_admin():
    username = 'admin'
    email = 'admin@example.com'
    password = 'password123'

    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser: {username}")
        User.objects.create_superuser(username, email, password)
        print(f"Superuser created. Login: {username} / {password}")
    else:
        print("Superuser 'admin' already exists.")

if __name__ == "__main__":
    create_admin()
