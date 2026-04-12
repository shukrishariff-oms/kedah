import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth.models import User

def seed_admin():
    username = os.getenv('ADMIN_USERNAME', 'admin')
    email = os.getenv('ADMIN_EMAIL', 'admin@example.com')
    password = os.getenv('ADMIN_PASSWORD', 'Kedah2026!')

    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser: {username}")
        User.objects.create_superuser(username, email, password)
    else:
        # Optional: Reset password to ensure it matches Kedah2026! if that's what's expected
        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
        print(f"Superuser {username} already exists. Password updated to match expected.")

if __name__ == "__main__":
    seed_admin()
