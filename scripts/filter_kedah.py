import json
import os

input_file = 'scripts/malaysia.district.geojson'
output_file = 'frontend/src/data/kedah-districts.json'

if not os.path.exists('frontend/src/data'):
    os.makedirs('frontend/src/data')

with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

kedah_features = [
    feature for feature in data['features']
    if feature['properties'].get('state') == 'KDH'
]

kedah_geojson = {
    "type": "FeatureCollection",
    "features": kedah_features
}

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(kedah_geojson, f, indent=2)

print(f"Extracted {len(kedah_features)} Kedah districts to {output_file}")
