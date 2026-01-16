import requests
import json
import os

URL = "https://raw.githubusercontent.com/nullifye/malaysia.geojson/master/malaysia.dun.geojson"
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "../frontend/src/data/kedah-duns.json")

def run():
    print(f"Downloading GeoJSON from {URL}...")
    try:
        response = requests.get(URL)
        response.raise_for_status()
        
        data = response.json()
        print(f"Total features: {len(data['features'])}")
        
        kedah_features = [
            f for f in data['features'] 
            if f['properties'].get('state') == 'Kedah'
        ]
        
        print(f"Found {len(kedah_features)} features for Kedah.")
        
        kedah_geojson = {
            "type": "FeatureCollection",
            "crs": data.get('crs'),
            "features": kedah_features
        }
        
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(kedah_geojson, f)
            
        print(f"Saved to {OUTPUT_FILE}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run()
