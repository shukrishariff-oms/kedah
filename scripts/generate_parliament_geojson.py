import json
import os
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

def run():
    # Use absolute paths or relative to the script execution location
    base_dir = r'j:\Kedah\frontend\src\data'
    input_file = os.path.join(base_dir, 'kedah-duns.json')
    output_file = os.path.join(base_dir, 'kedah-parliaments.json')

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}")
        # Fallback for dev environment path if running from root
        input_file = r'frontend\src\data\kedah-duns.json' 
        if not os.path.exists(input_file):
             print(f"Input file really not found: {input_file}")
             return

    with open(input_file, 'r') as f:
        duns_data = json.load(f)

    parliaments = {}

    for feature in duns_data['features']:
        props = feature['properties']
        p_code = props['code_parlimen']
        p_name = props['parlimen']
        
        if p_code not in parliaments:
            parliaments[p_code] = {
                'properties': {
                    'name': p_name,
                    'code': p_code,
                    'state': props['state']
                },
                'shapes': []
            }
        
        # Convert GeoJSON geometry to Shapely shape
        geom = shape(feature['geometry'])
        parliaments[p_code]['shapes'].append(geom)

    final_features = []

    for p_code, p_data in parliaments.items():
        print(f"Processing {p_data['properties']['name']} ({len(p_data['shapes'])} DUNs)...")
        # Union all DUNs in this parliament
        merged_shape = unary_union(p_data['shapes'])
        
        feature = {
            'type': 'Feature',
            'properties': p_data['properties'],
            'geometry': mapping(merged_shape)
        }
        final_features.append(feature)

    output_data = {
        'type': 'FeatureCollection',
        'features': final_features
    }

    with open(output_file, 'w') as f:
        json.dump(output_data, f)
    
    print(f"Generated {output_file} with {len(final_features)} merged parliaments.")

if __name__ == '__main__':
    run()
