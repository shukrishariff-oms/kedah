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

from api.models import Parliament, DUN

def run():
    print("Seeding Politics Data (Parliament & DUN)...")

    # Parliament Data
    parliaments = [
        {
            "code": "P004", "name": "Langkawi",
            "lat": 6.3500, "lng": 99.8000,
            "mp_name": "Dato' Suhaimi Abdullah", "mp_party": "PN (BERSATU)",
            "duns": [
                {"code": "N01", "name": "Ayer Hangat", "lat": 6.4250, "lng": 99.8167, "adun_name": "Shamsilah Siru", "adun_party": "PN (BERSATU)"},
                {"code": "N02", "name": "Kuah", "lat": 6.3167, "lng": 99.8500, "adun_name": "Amar Pared Mahamud", "adun_party": "PN (BERSATU)"},
            ]
        },
        {
            "code": "P006", "name": "Kubang Pasu",
            "lat": 6.4000, "lng": 100.4167,
            "mp_name": "Dato' Dr Ku Abd Rahman Ku Ismail", "mp_party": "PN (BERSATU)",
            "duns": [
                {"code": "N05", "name": "Bukit Kayu Hitam", "lat": 6.5167, "lng": 100.4167, "adun_name": "Halimaton Shaadiah Saad", "adun_party": "PN (BERSATU)"},
                {"code": "N06", "name": "Jitra", "lat": 6.2667, "lng": 100.4167, "adun_name": "Dr. Haim Hilman Abdullah", "adun_party": "PN (PAS)"},
            ]
        },
        {
            "code": "P009", "name": "Alor Setar",
            "lat": 6.1200, "lng": 100.3600,
            "mp_name": "Afnan Hamimi Taib Azamudden", "mp_party": "PN (PAS)",
            "duns": [
                {"code": "N12", "name": "Suka Menanti", "lat": 6.1500, "lng": 100.3800, "adun_name": "Dzowahir Ab Ghani", "adun_party": "PN (BERSATU)"},
                {"code": "N13", "name": "Kota Darul Aman", "lat": 6.1167, "lng": 100.3667, "adun_name": "Teh Swee Leong", "adun_party": "PH (DAP)"},
                {"code": "N14", "name": "Alor Mengkudu", "lat": 6.1000, "lng": 100.3833, "adun_name": "Muhamad Radhi Mat Din", "adun_party": "PN (PAS)"},
            ]
        },
        {
            "code": "P010", "name": "Kuala Kedah",
            "lat": 6.1000, "lng": 100.3000,
            "mp_name": "Dr. Ahmad Fakhruddin Fakhrurazi", "mp_party": "PN (PAS)",
            "duns": [
                {"code": "N15", "name": "Anak Bukit", "lat": 6.1667, "lng": 100.3667, "adun_name": "Rashidi Razak", "adun_party": "PN (PAS)"},
                {"code": "N16", "name": "Kubang Rotan", "lat": 6.1333, "lng": 100.3000, "adun_name": "Mohd Salleh Saidin", "adun_party": "PN (BERSATU)"},
                {"code": "N17", "name": "Pengkalan Kundor", "lat": 6.0667, "lng": 100.3167, "adun_name": "Mardhiyyah Johari", "adun_party": "PN (PAS)"},
            ]
        },
        {
            "code": "P014", "name": "Merbok",
            "lat": 5.7167, "lng": 100.4500,
            "mp_name": "Mohd Nazri Abu Hassan", "mp_party": "PN (BERSATU)",
            "duns": [
                {"code": "N25", "name": "Bukit Selambau", "lat": 5.6833, "lng": 100.5167, "adun_name": "Azizan Hamzah", "adun_party": "PN (PAS)"},
                {"code": "N26", "name": "Tanjong Dawai", "lat": 5.6833, "lng": 100.3667, "adun_name": "Hanif Ghazali", "adun_party": "PN (PAS)"},
            ]
        },
        {
            "code": "P015", "name": "Sungai Petani",
            "lat": 5.6500, "lng": 100.4833,
            "mp_name": "Dr. Mohammed Taufiq Johari", "mp_party": "PH (PKR)",
            "duns": [
                {"code": "N28", "name": "Bakar Arang", "lat": 5.6333, "lng": 100.4667, "adun_name": "Adam Adli", "adun_party": "PH (PKR)"}, # Placeholder if unsure
                {"code": "N29", "name": "Sidam", "lat": 5.6333, "lng": 100.5667, "adun_name": "Bau Wong Bau Ek", "adun_party": "PH (PKR)"},
            ]
        },
        {
            "code": "P012", "name": "Jerai",
            "lat": 5.8500, "lng": 100.4000,
            "mp_name": "Sabri Azit", "mp_party": "PN (PAS)",
            "duns": [
                {"code": "N20", "name": "Sungai Limau", "lat": 5.9000, "lng": 100.4000, "adun_name": "Mohd Azam Abd Samat", "adun_party": "PN (PAS)"},
                {"code": "N21", "name": "Guar Chempedak", "lat": 5.8500, "lng": 100.4500, "adun_name": "Abdul Hafiz Mohamad", "adun_party": "PN (BERSATU)"},
                {"code": "N22", "name": "Gurun", "lat": 5.8167, "lng": 100.4833, "adun_name": "Baddrol Bakhtiar", "adun_party": "PN (PAS)"},
            ]
        }
    ]

    for p_data in parliaments:
        parl, created = Parliament.objects.update_or_create(
            code=p_data['code'],
            defaults={
                'name': p_data['name'],
                'parliament_lat': p_data['lat'],
                'parliament_lng': p_data['lng'],
                'mp_name': p_data['mp_name'],
                'mp_party': p_data['mp_party']
            }
        )
        print(f"{'Created' if created else 'Updated'} Parliament: {parl.name}")

        for dun_data in p_data['duns']:
            dun, created = DUN.objects.update_or_create(
                code=dun_data['code'],
                defaults={
                    'parliament': parl,
                    'name': dun_data['name'],
                    'dun_lat': dun_data['lat'],
                    'dun_lng': dun_data['lng'],
                    'adun_name': dun_data['adun_name'],
                    'adun_party': dun_data['adun_party']
                }
            )
            print(f"  -> {'Created' if created else 'Updated'} DUN: {dun.name}")

    print("Politics Seeding Complete!")

if __name__ == '__main__':
    run()
