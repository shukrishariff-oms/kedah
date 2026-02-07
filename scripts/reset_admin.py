import os
import django
import sys

# Map the path to the backend folder
# Assuming this script is in j:/Kedah/scripts/ and backend is in j:/Kedah/backend/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(BASE_DIR, 'backend'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
username = 'admin'
password = 'password123'
email = 'admin@example.com'

try:
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"Updated password for existing user '{username}' to '{password}'")
    else:
        User.objects.create_superuser(username, email, password)
        print(f"Created new superuser '{username}' with password '{password}'")
except Exception as e:
    print(f"Error: {e}")
