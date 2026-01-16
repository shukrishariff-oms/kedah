import os
import django
import json

# Set up Django environment
import sys
# Add the parent directory (project root) to sys.path so we can find 'core'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import District, Place, Photo

def seed():
    print("Seeding Districts with rich information...")
    districts_data = [
        {
            "name": "Kota Setar", "lat": 6.1254, "lng": 100.3614,
            "description": "Ibu kota negeri Kedah yang kaya dengan sejarah kesultanan dan mercu tanda ikonik. Rumah kepada Masjid Zahir, antara masjid tercantik di dunia.",
            "specialties": ["Laksa Teluk Kechai", "Masjid Zahir", "Menara Alor Setar"]
        },
        {
            "name": "Kubang Pasu", "lat": 6.3125, "lng": 100.4186,
            "description": "Dikenali sebagai pusat pendidikan utama Kedah. Bersempadan dengan Thailand, ia merupakan pintu masuk penting bagi perdagangan dan pelancongan.",
            "specialties": ["Nasi Lemak Lupa Sentuh", "Pekan Rabu Jitra", "UUM"]
        },
        {
            "name": "Padang Terap", "lat": 6.2572, "lng": 100.6714,
            "description": "Daerah yang tenang dengan landskap hutan simpan yang luas. Destinasi terbaik bagi pencinta alam semula jadi dan aktiviti luar.",
            "specialties": ["Empangan Pedu", "Eko-pelancongan", "Madu Lebah Hutan"]
        },
        {
            "name": "Langkawi", "lat": 6.3500, "lng": 99.8000,
            "description": "Permata Kedah dan Tapak UNESCO Global Geopark. Terkenal dengan pantai putih yang menakjubkan, lagenda Mahsuri, dan beli-belah bebas cukai.",
            "specialties": ["Berlayar", "Cable Car", "Seafood Segar"]
        },
        {
            "name": "Kuala Muda", "lat": 5.6431, "lng": 100.4847,
            "description": "Pusat perindustrian dan petempatan kedua terbesar di Kedah. Kaya dengan tapak arkeologi Lembah Bujang yang membuktikan ketamadunan lama.",
            "specialties": ["Lembah Bujang", "Mee Udang Pulau Sayak", "Pantai Merdeka"]
        },
        {
            "name": "Yan", "lat": 5.8000, "lng": 100.4000,
            "description": "Daerah yang paling tenang dengan pemandangan Gunung Jerai dan sawat padi yang menghijau hingga ke tepi pantai.",
            "specialties": ["Gunung Jerai", "Air Terjun Titi Hayun", "Ikan Bakar"]
        },
        {
            "name": "Sik", "lat": 6.0000, "lng": 100.7500,
            "description": "Syurga eko-pelancongan di kawasan pedalaman. Terkenal dengan suasana desa yang asli dan aktiviti memancing di sungai-sungai jernih.",
            "specialties": ["Lubuk Simpul", "Lata Mengkuang", "Buah-buahan Musim"]
        },
        {
            "name": "Baling", "lat": 5.6764, "lng": 100.9175,
            "description": "Terkenal dengan kemegahan Gunung Baling dan tapak bersejarah Rundingan Baling. Destinasi wajib bagi pendaki dan peminat sejarah.",
            "specialties": ["Gunung Baling", "Kolam Air Panas Ulu Legong", "Pekasam"]
        },
        {
            "name": "Kulim", "lat": 5.3708, "lng": 100.5547,
            "description": "Peneraju teknologi tinggi Kedah melalui Kulim Hi-Tech Park. Menawarkan keseimbangan antara kemajuan industri dan kehijauan alam.",
            "specialties": ["Kulim Hi-Tech", "Sungai Sedim Tree Top Walk", "Nasi Kandar"]
        },
        {
            "name": "Bandar Baharu", "lat": 5.1333, "lng": 100.5000,
            "description": "Sempadan paling selatan Kedah. Terkenal dengan industri pertanian dan sebagai hub transit yang strategik.",
            "specialties": ["Ikan Sungai", "Pertanian", "Port Transit"]
        },
        {
            "name": "Pendang", "lat": 5.9928, "lng": 100.4739,
            "description": "Jantung pertanian Kedah. Terkenal sebagai pengeluar padi utama dengan pemandangan sawah yang luas melangkaui ufuk.",
            "specialties": ["Sawah Padi", "Garam Belacan", "Memancing Sawah"]
        },
        {
            "name": "Pokok Sena", "lat": 6.1667, "lng": 100.5167,
            "description": "Daerah yang baru membangun, menawarkan suasana subbandar yang selesa dengan akses mudah ke Alor Setar.",
            "specialties": ["Pasar Tani", "Suasana Kampung", "Pertanian Moden"]
        },
    ]

    district_objs = {}
    for d in districts_data:
        obj, created = District.objects.update_or_create(
            name=d['name'],
            defaults={
                'center_lat': d['lat'],
                'center_lng': d['lng'],
                'description': d['description'],
                'specialties': d['specialties'],
                'polygon_geojson': {} # Placeholder
            }
        )
        district_objs[d['name']] = obj

    print("Seeding Places with rich data...")
    places_data = [
        # Kota Setar
        {
            "district": "Kota Setar", "name": "Nasi Lemak Ong",
            "description": "Nasi lemak lagenda Alor Setar dengan pelbagai pilihan lauk pauk yang menyelerakan. Terkenal dengan sambalnya yang unik.",
            "address": "Jalan Teluk Wanjah, 05200 Alor Setar, Kedah",
            "lat": 6.1368, "lng": 100.3692,
            "categories": ["Makan Tradisional", "Sarapan"],
            "opening_hours": "07:00 AM - 12:00 PM", "phone": "012-3456789"
        },
        {
            "district": "Kota Setar", "name": "Laksa Teluk Kechai",
            "description": "Laksa Kedah asli yang dihidangkan dengan ulam-ulaman segar. Wajib cuba bersama otak-otak dan sambal belacan.",
            "address": "Teluk Kechai, 06600 Alor Setar, Kedah",
            "lat": 6.1083, "lng": 100.3225,
            "categories": ["Makan Tradisional", "Laksa"],
            "opening_hours": "12:00 PM - 07:00 PM", "phone": "013-4455667"
        },
        {
            "district": "Kota Setar", "name": "Masjid Zahir",
            "description": "Antara masjid tertua dan tercantik di Malaysia. Seni binanya diinspirasikan daripada Masjid Azizi di Sumatera.",
            "address": "Jalan Putera, 05000 Alor Setar, Kedah",
            "lat": 6.1197, "lng": 100.3662,
            "categories": ["Menarik", "Sejarah", "Destinasi Ikonik"],
            "opening_hours": "08:00 AM - 06:00 PM", "phone": ""
        },
        # Kubang Pasu
        {
            "district": "Kubang Pasu", "name": "Nasi Lemak Lupa Sentuh",
            "description": "Port sarapan popular di Jitra. Nasi lemak bungkus yang simple tapi sangat memikat selera.",
            "address": "Bazaar Jitra, 06000 Jitra, Kedah",
            "lat": 6.2681, "lng": 100.4181,
            "categories": ["Makan Tradisional", "Sarapan"],
            "opening_hours": "06:30 AM - 10:30 AM", "phone": ""
        },
        # Langkawi
        {
            "district": "Langkawi", "name": "Cable Car Langkawi",
            "description": "Alami pemandangan 360 darjah seluruh pulau Langkawi dari puncak Gunung Mat Cincang.",
            "address": "Oriental Village, Langkawi",
            "lat": 6.3712, "lng": 99.6716,
            "categories": ["Menarik", "Destinasi Ikonik"],
            "opening_hours": "09:30 AM - 06:00 PM", "phone": "04-9594225"
        },
        {
            "district": "Langkawi", "name": "Scarborough Fish & Chips",
            "description": "Kedai makan tepi pantai dengan vibe yang sangat chill. Terkenal dengan portion ikan yang besar dan segar.",
            "address": "Lot 102, Jalan Tanjung Rhu, Langkawi",
            "lat": 6.4312, "lng": 99.8821,
            "categories": ["Western", "Seafood", "Cafe Modern"],
            "opening_hours": "11:00 AM - 10:00 PM", "phone": "019-9988776"
        },
        # Yan
        {
            "district": "Yan", "name": "Puncak Gunung Jerai",
            "description": "Menawarkan udara yang segar dan pemandangan 'carpet' sawah padi yang sangat cantik dari puncak.",
            "address": "Gunung Jerai, Yan, Kedah",
            "lat": 5.7831, "lng": 100.4411,
            "categories": ["Menarik", "Alam Semulajadi", "Eko-Pelancongan"],
            "opening_hours": "06:00 AM - 08:00 PM", "phone": ""
        },
        {
            "district": "Yan", "name": "Resort The Regency Jerai",
            "description": "Menginap di puncak gunung dengan taman bunga hydrangea yang cantik dan suasana sejuk.",
            "address": "Puncak Gunung Jerai, Yan, Kedah",
            "lat": 5.7845, "lng": 100.4398,
            "categories": ["Hotel", "Destinasi Ikonik", "Alam"],
            "opening_hours": "12:00 AM - 11:59 PM", "phone": "04-4667777"
        },
        # Baling
        {
            "district": "Baling", "name": "Gunung Baling",
            "description": "Destinasi hike popular dengan pemandangan 360 darjah bandar Baling dan sekitarnya dari puncak berbatu.",
            "address": "Baling, Kedah",
            "lat": 5.6881, "lng": 100.9168,
            "categories": ["Alam", "Eko-Pelancongan"],
            "opening_hours": "05:00 AM - 02:00 PM", "phone": ""
        },
        {
            "district": "Baling", "name": "Kolam Air Panas Ulu Legong",
            "description": "Pusat rekreasi air panas yang beroperasi 24 jam. Sangat popular untuk dikunjungi pada waktu malam.",
            "address": "Kampung Ulu Legong, 09100 Baling, Kedah",
            "lat": 5.8155, "lng": 100.9322,
            "categories": ["Menarik", "Alam", "Alam Semulajadi"],
            "opening_hours": "12:00 AM - 11:59 PM", "phone": "04-4721155"
        },
        # Kuala Muda
        {
            "district": "Kuala Muda", "name": "Tapak Arkeologi Lembah Bujang",
            "description": "Tapak tamadun tertua di Asia Tenggara. Muzium arkeologi yang menempatkan candi-candi lama peninggalan sejarah.",
            "address": "Lembah Bujang, Merbok, Kedah",
            "lat": 5.7388, "lng": 100.4136,
            "categories": ["Menarik", "Sejarah", "Eko-Pelancongan"],
            "opening_hours": "09:00 AM - 05:00 PM", "phone": "04-4572005"
        },
        {
            "district": "Kuala Muda", "name": "Pantai Merdeka",
            "description": "Pantai perkelahan popular di selatan Kedah yang menghadap Selat Melaka dan Pulau Pinang.",
            "address": "Pantai Merdeka, 08500 Kota Kuala Muda, Kedah",
            "lat": 5.5645, "lng": 100.3667,
            "categories": ["Alam", "Alam Semulajadi"],
            "opening_hours": "12:00 AM - 11:59 PM", "phone": ""
        },
        # Kulim
        {
            "district": "Kulim", "name": "Tree Top Walk Sungai Sedim",
            "description": "Laluan kanopi terpanjang di dunia yang terletak dalam hutan simpan Sungai Sedim.",
            "address": "Sungai Sedim, Kulim, Kedah",
            "lat": 5.4145, "lng": 100.7765,
            "categories": ["Alam", "Eko-Pelancongan", "Alam Semulajadi"],
            "opening_hours": "09:00 AM - 05:00 PM", "phone": "04-4866633"
        },
        # Sik
        {
            "district": "Sik", "name": "Lata Mengkuang",
            "description": "Air terjun yang cantik dan jernih di tengah hutan. Sesuai untuk perkelahan keluarga dan aktiviti camping.",
            "address": "Hutan Simpan Bukit Enggang, Sik, Kedah",
            "lat": 5.9123, "lng": 100.7894,
            "categories": ["Alam", "Alam Semulajadi", "Eko-Pelancongan"],
            "opening_hours": "08:00 AM - 06:00 PM", "phone": ""
        },
        # Padang Terap
        {
            "district": "Padang Terap", "name": "Tasik Pedu",
            "description": "Tasik buatan manusia seluas 75km persegi yang dikelilingi hutan hujan tropika tertua.",
            "address": "Pedu, Kedah",
            "lat": 6.2575, "lng": 100.7832,
            "categories": ["Alam", "Alam Semulajadi", "Eko-Pelancongan"],
            "opening_hours": "12:00 AM - 11:59 PM", "phone": ""
        },
        # Pendang
        {
            "district": "Pendang", "name": "Pusat Rekreasi Garam Belacan",
            "description": "Terkenal dengan pengeluaran belacan asli Kedah dan pemandangan sawah padi yang luas.",
            "address": "Pendang, Kedah",
            "lat": 5.9912, "lng": 100.4721,
            "categories": ["Menarik", "Pertanian"],
            "opening_hours": "08:00 AM - 06:00 PM", "phone": ""
        }
    ]

    for p in places_data:
        Place.objects.update_or_create(
            name=p['name'],
            defaults={
                'district': district_objs[p['district']],
                'description': p['description'],
                'address': p['address'],
                'lat': p['lat'],
                'lng': p['lng'],
                'categories': p['categories'],
                'opening_hours': p['opening_hours'],
                'phone': p['phone'],
                'status': 'published'
            }
        )

    print("Seeding complete!")

if __name__ == "__main__":
    seed()
