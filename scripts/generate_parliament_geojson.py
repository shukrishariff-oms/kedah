import json
import os

def run():
    input_file = r'e:\Kedah\frontend\src\data\kedah-duns.json'
    output_file = r'e:\Kedah\frontend\src\data\kedah-parliaments.json'

    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}")
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
                'type': 'Feature',
                'properties': {
                    'name': p_name,
                    'code': p_code,
                    'state': props['state']
                },
                'geometry': {
                    'type': 'GeometryCollection',
                    'geometries': []
                }
            }
        
        parliaments[p_code]['geometry']['geometries'].append(feature['geometry'])

    # Simplify GeometryCollection back to MultiPolygon if possible, 
    # but for now, GeometryCollection is fine for Leaflet.
    
    output_data = {
        'type': 'FeatureCollection',
        'features': list(parliaments.values())
    }

    with open(output_file, 'w') as f:
        json.dump(output_data, f)
    
    print(f"Generated {output_file} with {len(parliaments)} parliaments.")

if __name__ == '__main__':
    run()
