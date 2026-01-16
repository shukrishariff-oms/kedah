import os
import sys
import django
from django.utils.text import slugify

# Add the project directory to the sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(BASE_DIR, 'backend'))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import District, Place

def run():
    print("Seeding Enhancement Data...")

    # 1. Update District Paddy Statuses
    paddy_updates = {
        'Kota Setar': 'planting',
        'Pendang': 'growing',
        'Yan': 'harvesting',
        'Kubang Pasu': 'fallow',
        'Kuala Muda': 'growing',
        'Padang Terap': 'planting',
    }

    for name, status in paddy_updates.items():
        try:
            district = District.objects.get(name=name)
            district.paddy_status = status
            district.save()
            print(f"Updated {name} paddy status to {status}")
        except District.DoesNotExist:
            print(f"District {name} not found, skipping.")

    # 2. Add 'Makan-Makan' Spots
    food_spots = [
        {
            'district': 'Kota Setar',
            'name': 'Laksa Teluk Kechai',
            'description': 'Famous authentic Kedah Laksa with thick fish gravy. A must-visit for foodies.',
            'categories': ['Food', 'Signature Dish', 'Halal'],
            'lat': 6.0833,
            'lng': 100.3333, # Approximate
            'address': 'Jalan Kuala Kedah, 06600 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'district': 'Kuala Muda',
            'name': 'Nasi Kandar Yasmeen',
            'description': 'Legendary Nasi Kandar in Sungai Petani. Known for their fried chicken and diverse curries.',
            'categories': ['Food', 'Nasi Kandar', 'Halal'],
            'lat': 5.6433,
            'lng': 100.4883,
            'address': 'Sungai Petani, Kedah',
            'status': 'published'
        }
    ]

    # 3. Add 'Hidden Gems'
    gems = [
        {
            'district': 'Yan',
            'name': 'Air Terjun Titi Hayun',
            'description': 'A serene waterfall located at the foot of Mount Jerai. Perfect for picnics and cooling off.',
            'categories': ['Hidden Gem', 'Nature', 'Waterfall'],
            'lat': 5.7667,
            'lng': 100.3833,
            'address': 'Yan, Kedah',
            'status': 'published'
        },
        {
            'district': 'Baling',
            'name': 'Gunung Baling',
            'description': 'A stunning limestone mountain offering panoramic views. A favorite hike for locals.',
            'categories': ['Hidden Gem', 'Hiking', 'Adventure'],
            'lat': 5.6789,
            'lng': 100.9182,
            'address': 'Baling, Kedah',
            'status': 'published'
        }
    ]

    # 4. Add 'Historical Sites'
    history_sites = [
        {
            'district': 'Kuala Muda',
            'name': 'Lembah Bujang Archaeological Museum',
            'description': 'Home to the remains of the ancient Hindu-Buddhist kingdom of Kedah Tua.',
            'categories': ['History', 'Museum', 'Archaeology'],
            'lat': 5.7369,
            'lng': 100.4136,
            'address': 'Merbok, Kedah',
            'status': 'published'
        },
        {
            'district': 'Kota Setar',
            'name': 'Balai Besar',
            'description': 'A grand wooden hall built in 1898, used for royal ceremonies and state functions.',
            'categories': ['History', 'Architecture', 'Royal'],
            'lat': 6.1200,
            'lng': 100.3600,
            'address': 'Alor Setar, Kedah',
            'status': 'published'
        }
    ]

    all_places = food_spots + gems + history_sites

    for place_data in all_places:
        district_name = place_data.pop('district')
        try:
            district = District.objects.get(name=district_name)
            place, created = Place.objects.get_or_create(
                slug=slugify(place_data['name']),
                defaults=place_data | {'district': district}
            )
            if created:
                print(f"Created Place: {place.name}")
            else:
                print(f"Place {place.name} already exists.")
        except District.DoesNotExist:
            print(f"District {district_name} for {place_data['name']} not found.")

    print("Seeding Complete!")

if __name__ == '__main__':
    run()
