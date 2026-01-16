import os
import sys
import django

# Add the project directory to the sys.path
import sys
# Fix path for Render: Add backend/ directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/backend')

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Parliament, DUN

# Photo Dictionary (Curated)
PHOTOS = {
    "Sanusi Md Nor": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Muhammad_Sanusi_Md_Nor.png",
    "Mahathir Mohamad": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Mahathir_Mohamad_2019.jpg",
    "Baddrol Bakhtiar": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Baddrol_Bakhtiar.jpg",
    "Johari Abdul": "https://upload.wikimedia.org/wikipedia/commons/6/62/Johari_Abdul.png",
    "Mahfuz Omar": "https://upload.wikimedia.org/wikipedia/commons/2/22/Mahfuz_Omar.png",
    "Mukhriz Mahathir": "https://upload.wikimedia.org/wikipedia/commons/9/90/Mukhriz_Mahathir.png",
    "Amiruddin Hamzah": "https://upload.wikimedia.org/wikipedia/commons/0/07/Amiruddin_Hamzah.png",
    "Takiyuddin Hassan": "https://upload.wikimedia.org/wikipedia/commons/7/77/Takiyuddin_Hassan.png",
}

def get_photo(name, gender='M'):
    if "Sanusi" in name: return PHOTOS["Sanusi Md Nor"]
    if "Baddrol" in name: return PHOTOS["Baddrol Bakhtiar"]
    
    # Placeholder with Initials
    initials = "".join([n[0] for n in name.split()[:2]])
    bg_color = "006A4E" # Kedah Green
    if gender == 'F': bg_color = "C02F5D" 
    
    return f"https://ui-avatars.com/api/?name={name}&background={bg_color}&color=fff&size=256&font-size=0.33"

def run():
    print("Seeding FULL Politics Data (15 Parlimen, 36 DUN)...")

    # Data Structure: Code -> { Name, MP, Party, DUNs: [] }
    # Coordinates are approximate centroids for list view context
    
    data = [
        {
            "code": "P004", "name": "Langkawi", "lat": 6.3500, "lng": 99.8000,
            "mp": "Dato' Mohd Suhaimi Abdullah", "party": "PN (BERSATU)",
            "duns": [
                {"code": "N01", "name": "Ayer Hangat", "adun": "Shamsilah Siru", "party": "PN (BERSATU)", "gender": "F"},
                {"code": "N02", "name": "Kuah", "adun": "Amar Pared Mahamud", "party": "PN (BERSATU)", "gender": "M"},
            ]
        },
        {
            "code": "P005", "name": "Jerlun", "lat": 6.3333, "lng": 100.2667,
            "mp": "Dr. Abd Ghani Ahmad", "party": "PN (PAS)",
            "duns": [
                {"code": "N03", "name": "Kota Siputeh", "adun": "Mohd Ashraf Mustaqim", "party": "PN (BERSATU)", "gender": "M"},
                {"code": "N04", "name": "Ayer Hitam", "adun": "Azhar Idrus", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P006", "name": "Kubang Pasu", "lat": 6.4000, "lng": 100.4167,
            "mp": "Dato' Dr Ku Abd Rahman Ku Ismail", "party": "PN (BERSATU)",
            "duns": [
                {"code": "N05", "name": "Bukit Kayu Hitam", "adun": "Halimaton Shaadiah Saad", "party": "PN (BERSATU)", "gender": "F"},
                {"code": "N06", "name": "Jitra", "adun": "Dr. Haim Hilman Abdullah", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P007", "name": "Padang Terap", "lat": 6.4500, "lng": 100.6000,
            "mp": "Nurul Amin Hamid", "party": "PN (PAS)",
            "duns": [
                {"code": "N07", "name": "Kuala Nerang", "adun": "Munir Zakaria", "party": "PN (PAS)", "gender": "M"},
                {"code": "N08", "name": "Pedu", "adun": "Mohd Radzi Md Amin", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P008", "name": "Pokok Sena", "lat": 6.1667, "lng": 100.5167,
            "mp": "Dato' Ahmad Saad @ Yahaya", "party": "PN (PAS)",
            "duns": [
                {"code": "N09", "name": "Bukit Lada", "adun": "Salim Mahmood", "party": "PN (PAS)", "gender": "M"},
                {"code": "N10", "name": "Bukit Pinang", "adun": "Wan Romani Wan Salim", "party": "PN (PAS)", "gender": "M"},
                {"code": "N11", "name": "Derga", "adun": "Muhamad Amri Wahab", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P009", "name": "Alor Setar", "lat": 6.1200, "lng": 100.3600,
            "mp": "Afnan Hamimi Taib Azamudden", "party": "PN (PAS)",
            "duns": [
                {"code": "N12", "name": "Suka Menanti", "adun": "Dzowahir Ab Ghani", "party": "PN (BERSATU)", "gender": "M"},
                {"code": "N13", "name": "Kota Darul Aman", "adun": "Teh Swee Leong", "party": "PH (DAP)", "gender": "M"},
                {"code": "N14", "name": "Alor Mengkudu", "adun": "Muhamad Radhi Mat Din", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P010", "name": "Kuala Kedah", "lat": 6.1000, "lng": 100.3000,
            "mp": "Dr. Ahmad Fakhruddin Fakhrurazi", "party": "PN (PAS)",
            "duns": [
                {"code": "N15", "name": "Anak Bukit", "adun": "Rashidi Razak", "party": "PN (PAS)", "gender": "M"},
                {"code": "N16", "name": "Kubang Rotan", "adun": "Mohd Salleh Saidin", "party": "PN (BERSATU)", "gender": "M"},
                {"code": "N17", "name": "Pengkalan Kundor", "adun": "Mardhiyyah Johari", "party": "PN (PAS)", "gender": "F"},
            ]
        },
        {
            "code": "P011", "name": "Pendang", "lat": 6.0000, "lng": 100.4667,
            "mp": "Datuk Awang Hashim", "party": "PN (PAS)",
            "duns": [
                {"code": "N18", "name": "Tokai", "adun": "Mohd Hayati Othman", "party": "PN (PAS)", "gender": "M"},
                {"code": "N19", "name": "Sungai Tiang", "adun": "Abdul Razak Khamis", "party": "PN (BERSATU)", "gender": "M"},
            ]
        },
        {
            "code": "P012", "name": "Jerai", "lat": 5.8500, "lng": 100.4000,
            "mp": "Sabri Azit", "party": "PN (PAS)",
            "duns": [
                {"code": "N20", "name": "Sungai Limau", "adun": "Mohd Azam Abd Samat", "party": "PN (PAS)", "gender": "M"},
                {"code": "N21", "name": "Guar Chempedak", "adun": "Abdul Hafiz Mohamad", "party": "PN (BERSATU)", "gender": "M"},
                {"code": "N22", "name": "Gurun", "adun": "Baddrol Bakhtiar", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P013", "name": "Sik", "lat": 5.8167, "lng": 100.7500,
            "mp": "Ahmad Tarmizi Sulaiman", "party": "PN (PAS)",
            "duns": [
                {"code": "N23", "name": "Belantek", "adun": "Ahmad Sulaiman", "party": "PN (PAS)", "gender": "M"},
                {"code": "N24", "name": "Jeneri", "adun": "Dato' Seri Muhammad Sanusi Md Nor", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P014", "name": "Merbok", "lat": 5.7167, "lng": 100.4500,
            "mp": "Mohd Nazri Abu Hassan", "party": "PN (BERSATU)",
            "duns": [
                {"code": "N25", "name": "Bukit Selambau", "adun": "Azizan Hamzah", "party": "PN (PAS)", "gender": "M"},
                {"code": "N26", "name": "Tanjong Dawai", "adun": "Hanif Ghazali", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P015", "name": "Sungai Petani", "lat": 5.6500, "lng": 100.4833,
            "mp": "Dr. Mohammed Taufiq Johari", "party": "PH (PKR)",
            "duns": [
                {"code": "N27", "name": "Pantai Merdeka", "adun": "Sharir Long", "party": "PN (PAS)", "gender": "M"},
                {"code": "N28", "name": "Bakar Arang", "adun": "Adam Loh Wei Chean", "party": "PH (PKR)", "gender": "M"},
                {"code": "N29", "name": "Sidam", "adun": "Bau Wong Bau Ek", "party": "PH (PKR)", "gender": "M"},
            ]
        },
        {
            "code": "P016", "name": "Baling", "lat": 5.6667, "lng": 100.9167,
            "mp": "Hassan Saad", "party": "PN (PAS)", # Correction from earlier source which said Che Abdullah (Previous MP)
            "duns": [
                {"code": "N30", "name": "Bayu", "adun": "Mohd Taufik Yaacob", "party": "PN (PAS)", "gender": "M"},
                {"code": "N31", "name": "Kupang", "adun": "Dato' Najmi Ahmad", "party": "PN (PAS)", "gender": "M"},
                {"code": "N32", "name": "Kuala Ketil", "adun": "Mansor Zakaria", "party": "PN (PAS)", "gender": "M"},
            ]
        },
        {
            "code": "P017", "name": "Padang Serai", "lat": 5.5167, "lng": 100.6000,
            "mp": "Dato' Azman Nasrudin", "party": "PN (BERSATU)",
            "duns": [
                {"code": "N33", "name": "Merbau Pulas", "adun": "Dato' Siti Ashah Ghazali", "party": "PN (PAS)", "gender": "F"},
                {"code": "N34", "name": "Lunas", "adun": "Khairul Anuar Ramli", "party": "PN (BERSATU)", "gender": "M"},
            ]
        },
        {
            "code": "P018", "name": "Kulim-Bandar Baharu", "lat": 5.3667, "lng": 100.5500,
            "mp": "Roslan Hashim", "party": "PN (BERSATU)",
            "duns": [
                {"code": "N35", "name": "Kulim", "adun": "Wong Chia Zhen", "party": "PN (GERAKAN)", "gender": "M"},
                {"code": "N36", "name": "Bandar Baharu", "adun": "Mohd Suffian Yusoff", "party": "PN (PAS)", "gender": "M"},
            ]
        }
    ]

    for p in data:
        parl, _ = Parliament.objects.update_or_create(
            code=p['code'],
            defaults={
                'name': p['name'],
                'parliament_lat': p['lat'],
                'parliament_lng': p['lng'],
                'mp_name': p['mp'],
                'mp_party': p['party'],
                'mp_photo_url': get_photo(p['mp'], 'M') # Assuming MPs M for now or manual override above
            }
        )
        print(f"Update Parliament: {parl.name}")

        for d in p['duns']:
            dun, _ = DUN.objects.update_or_create(
                code=d['code'],
                defaults={
                    'parliament': parl,
                    'name': d['name'],
                    'dun_lat': p['lat'], # Approximate to P center if unknown
                    'dun_lng': p['lng'],
                    'adun_name': d['adun'],
                    'adun_party': d['party'],
                    'adun_photo_url': get_photo(d['adun'], d['gender'])
                }
            )
            print(f"  -> DUN: {dun.name} ({dun.adun_name})")

    print("Successfully seeded all 15 Parliaments and 36 DUNs.")

if __name__ == '__main__':
    run()
