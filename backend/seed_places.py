import os
import sys
import django
import random

# Setup Django Environment
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir) # append 'backend' to path
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Place, District

def seed_tourism():
    print("Seeding Tourism Data...")

    # 1. Ensure Districts Exist
    districts_data = [
        {'name': 'Kota Setar', 'lat': 6.12, 'lng': 100.36},
        {'name': 'Langkawi', 'lat': 6.35, 'lng': 99.8},
        {'name': 'Kuala Muda', 'lat': 5.65, 'lng': 100.48},
        {'name': 'Yan', 'lat': 5.8, 'lng': 100.37},
        {'name': 'Kubang Pasu', 'lat': 6.30, 'lng': 100.40},
    ]

    districts = {}
    for d in districts_data:
        district, created = District.objects.get_or_create(
            name=d['name'],
            defaults={
                'center_lat': d['lat'],
                'center_lng': d['lng'],
                'slug': d['name'].lower().replace(' ', '-'),
                'description': f"Daerah {d['name']}"
            }
        )
        districts[d['name']] = district
        if created:
            print(f"Created District: {d['name']}")

    # 2. Mock Places (Vibes: Sawah, Hipster, Warung, Seafood)
    places = [
        {
            'name': 'Cafe Jerami',
            'district': 'Yan',
            'desc': 'Cafe tenang di tengah sawah padi dengan pemandangan Gunung Jerai. Best untuk OOTD.',
            'cats': ['Food', 'Sawah', 'Cafe'],
            'lat': 5.81, 'lng': 100.38
        },
        {
            'name': 'Nasi Kandar Yasmeen',
            'district': 'Kota Setar',
            'desc': 'Legend nasi kandar Alor Setar. Kuah pekat likat.',
            'cats': ['Food', 'Warung', 'Legend'],
            'lat': 6.12, 'lng': 100.37
        },
        {
            'name': 'Caffe Diem',
            'district': 'Kota Setar',
            'desc': 'Cafe hipster di bangunan bersejarah Pekan Cina.',
            'cats': ['Food', 'Cafe', 'Hipster'],
            'lat': 6.11, 'lng': 100.36
        },
        {
            'name': 'Laksa Ikan Sekoq',
            'district': 'Langkawi',
            'desc': 'Makan laksa tepi airport sambil tengok kapal terbang mendarat.',
            'cats': ['Food', 'Warung', 'Seafood'],
            'lat': 6.34, 'lng': 99.73
        },
        {
            'name': 'Ikan Bakar Top',
            'district': 'Kuala Muda',
            'desc': 'Ikan bakar fresh dari jeti. Sambal padu.',
            'cats': ['Food', 'Seafood', 'Dinner'],
            'lat': 5.64, 'lng': 100.49
        },
        {
            'name': 'Rumah Kopi',
            'district': 'Kubang Pasu',
            'desc': 'Kopi kampung original dalam suasana desa.',
            'cats': ['Food', 'Cafe', 'Sawah'],
            'lat': 6.31, 'lng': 100.41
        },
        {
            'name': 'Hameediyah Bistro',
            'district': 'Kota Setar',
            'desc': 'Cawangan nasi kandar paling tua di Malaysia.',
            'cats': ['Food', 'Legend', 'Warung'],
            'lat': 6.13, 'lng': 100.38
        },
        {
            'name': 'Sunset Grill',
            'district': 'Langkawi',
            'desc': 'Makan malam romantik menghadap matahari terbenam.',
            'cats': ['Food', 'Hipster', 'Seafood'],
            'lat': 6.36, 'lng': 99.6
        }
    ]

    for p in places:
        Place.objects.get_or_create(
            name=p['name'],
            district=districts[p['district']],
            defaults={
                'description': p['desc'],
                'lat': p['lat'],
                'lng': p['lng'],
                'categories': p['cats'],
                'status': 'published',
                'address': f"Alamat contoh {p['name']}, {p['district']}, Kedah.",
                'slug': p['name'].lower().replace(' ', '-')
            }
        )
        print(f"Seeded Place: {p['name']}")

    print("Seeding Complete!")

if __name__ == '__main__':
    seed_tourism()
