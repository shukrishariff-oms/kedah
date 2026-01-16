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
    print("Seeding Kota Setar Data...")

    district_name = 'Kota Setar'
    try:
        district = District.objects.get(name=district_name)
    except District.DoesNotExist:
        print(f"Error: District {district_name} not found. Please create it first.")
        return

    places = [
        {
            'name': 'Menara Alor Setar',
            'description': 'The second tallest telecommunication tower in Malaysia, offering a panoramic view of Alor Setar city and surrounding paddy fields.',
            'categories': ['Iconic', 'Tourism', 'Landmark'],
            'lat': 6.1243,
            'lng': 100.3685,
            'address': 'Lebuhraya Darul Aman, 05000 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Masjid Zahir',
            'description': 'One of the oldest and most beautiful mosques in Malaysia, known for its Moorish architecture and five black domes.',
            'categories': ['History', 'Religious', 'Architecture'],
            'lat': 6.1199,
            'lng': 100.3644,
            'address': 'Jalan Kampung Perak, Bandar Alor Setar, 05150 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Pekan Rabu',
            'description': 'A well-known market complex where locals sell traditional delicacies like dodol, kuih bahulu, and local handicrafts.',
            'categories': ['Shopping', 'Food', 'Culture'],
            'lat': 6.1215,
            'lng': 100.3660,
            'address': 'Jalan Tunku Ibrahim, Bandar Alor Setar, 05000 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Rumah Kelahiran Mahathir',
            'description': 'The birthplace of Tun Dr. Mahathir Mohamad, Malaysia’s 4th and 7th Prime Minister, preserved as a historical gallery.',
            'categories': ['History', 'Museum', 'Educational'],
            'lat': 6.1085,
            'lng': 100.3670,
            'address': 'No. 18, Lorong Kilang Ais, Off Jalan Pegawai, 05000 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Muzium Padi',
            'description': 'A unique museum dedicated to rice, featuring a massive 360-degree mural reflecting the rustic beauty of Kedah.',
            'categories': ['History', 'Museum', 'Paddy'],
            'lat': 6.1925,
            'lng': 100.3175,
            'address': 'Gunung Keriang, 06570 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Gunung Keriang',
            'description': 'A limestone hill shaped like an elephant, popular for hiking, caving, and purchasing healing crystals.',
            'categories': ['Nature', 'Hidden Gem', 'Hiking', 'Adventure'],
            'lat': 6.1890,
            'lng': 100.3150,
            'address': 'Gunung Keriang, 06570 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Nasi Lemak Ong',
            'description': 'A famous supper spot serving delicious Nasi Lemak with a variety of rich curries and side dishes.',
            'categories': ['Food', 'Local Favorite', 'Dinner'],
            'lat': 6.1090,
            'lng': 100.3700,
            'address': 'Jalan Kampung Perak, 05100 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Restoran Mikamal',
            'description': 'A legendary spot for Mee Goreng Mamak and Pasembur, operating for decades and loved by locals.',
            'categories': ['Food', 'Mamak', 'Legendary'],
            'lat': 6.1205,
            'lng': 100.3710,
            'address': 'Jalan Tunku Ibrahim, 05000 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Masjid Albukhary',
            'description': 'A stunning modern mosque with Persian and Turkish architectural influences, part of the larger Albukhary Complex.',
            'categories': ['Religious', 'Architecture', 'Landmark'],
            'lat': 6.1350,
            'lng': 100.3850,
            'address': 'Jalan Langgar, 05460 Alor Setar, Kedah',
            'status': 'published'
        },
        {
            'name': 'Taman Jubli Emas',
            'description': 'A spacious recreational park created to commemorate the Golden Jubilee of the Sultan of Kedah, perfect for jogging and picnics.',
            'categories': ['Recreation', 'Park', 'Family'],
            'lat': 6.1500,
            'lng': 100.3800,
            'address': 'Jalan Suka Menanti, 05150 Alor Setar, Kedah',
            'status': 'published'
        }
    ]

    for place_data in places:
        place, created = Place.objects.get_or_create(
            slug=slugify(place_data['name']),
            district=district,
            defaults=place_data
        )
        if created:
            print(f"Created: {place.name}")
        else:
            print(f"Skipped (Exists): {place.name}")

    print("Kota Setar Seeding Complete!")

if __name__ == '__main__':
    run()
