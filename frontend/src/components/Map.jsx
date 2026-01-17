import { MapContainer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import kedahDistricts from '../data/kedah-districts.json';
import kedahDUNs from '../data/kedah-duns.json';
import kedahParliaments from '../data/kedah-parliaments.json';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet with React
// ... (keep inputs same)

// ... (imports are correct above)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

import { useState } from 'react';

// Component to handle dynamic interaction updates
const MapInteractionHandler = ({ interactive, lockView }) => {
    const map = useMap();

    useEffect(() => {
        if (interactive && !lockView) {
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            if (map.tap) map.tap.enable();
        } else {
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            if (map.tap) map.tap.disable();

            // Reset view only if not locked (or maybe we want to enforce center?)
            // If locked, we usually want it fixed at center. 
            // Let's keep the reset behavior or ensure it stays at center props.
            if (!interactive) {
                map.setView([6.12, 100.37], 9);
            }
        }
    }, [interactive, lockView, map]);

    return null;
}

const DISTRICT_COLORS = {
    'Baling': '#F44336',      // Red
    'Bandar Baharu': '#2196F3', // Blue
    'Kota Setar': '#E91E63',   // Pink
    'Kuala Muda': '#607D8B',    // Blue Grey
    'Kubang Pasu': '#4CAF50',   // Green
    'Kulim': '#9C27B0',         // Purple
    'Langkawi': '#03A9F4',      // Light Blue
    'Padang Terap': '#8BC34A',  // Light Green
    'Pendang': '#FF9800',       // Orange
    'Pokok Sena': '#FFEB3B',    // Yellow
    'Sik': '#795548',           // Brown
    'Yan': '#00BCD4'            // Cyan
};

const Map = ({ markers = [], districts = [], politicalData = [], politicsMode = 'parlimen', center = [6.12, 100.37], zoom = 9, interactive = true, onDistrictSelect, lockView = false }) => {
    const [spotlight, setSpotlight] = useState(null);

    // Sync spotlight with external prop if provided (optional, for bidirectional control)
    useEffect(() => {
        if (interactive && onDistrictSelect) {
            // Logic to sync if needed, but primarily we want click -> onDistrictSelect
        }
    }, []);

    // Determine which GeoJSON data to show
    const isDunMode = politicalData.length > 0 && politicsMode === 'dun';
    const isParlimenMode = politicalData.length > 0 && politicsMode === 'parlimen';

    let geoJsonData = kedahDistricts;
    if (isDunMode) geoJsonData = kedahDUNs;
    if (isParlimenMode) geoJsonData = kedahParliaments;

    const districtStyle = (feature) => {
        // District Logic
        if (!isDunMode) {
            const name = feature.properties.name;
            const isSelected = spotlight && spotlight.name === name;
            return {
                fillColor: DISTRICT_COLORS[name] || '#9e9e9e',
                weight: isSelected ? 4 : 2,
                opacity: 1,
                color: isSelected ? '#ffd700' : 'white',
                fillOpacity: isSelected ? 0.9 : 0.7
            };
        }

        // DUN Logic
        if (isDunMode) {
            const name = feature.properties.dun;
            const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
            const color = `hsl(${Math.abs(hash) % 360}, 60%, 50%)`;

            return {
                fillColor: color,
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.6
            };
        }

        // Parliament Logic
        const name = feature.properties.name;
        const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const color = `hsl(${Math.abs(hash) % 360}, 70%, 40%)`;

        return {
            fillColor: color,
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    };

    const onEachDistrict = (feature, layer) => {
        // Handle District Labels
        if (!isDunMode) {
            const name = feature.properties.name;
            layer.bindTooltip(name, {
                permanent: false,
                direction: 'center',
                className: 'district-label font-bold text-xs'
            });

            if (interactive) {
                layer.on({
                    mouseover: (e) => {
                        const layer = e.target;
                        if (!spotlight || spotlight.name !== name) {
                            layer.setStyle({ fillOpacity: 0.9, weight: 3 });
                        }
                    },
                    mouseout: (e) => {
                        const layer = e.target;
                        if (!spotlight || spotlight.name !== name) {
                            layer.setStyle({ fillOpacity: 0.7, weight: 2 });
                        }
                    },
                    click: () => {
                        const districtData = districts.find(d => d.name === name);
                        setSpotlight(districtData || { name: name });

                        if (onDistrictSelect) {
                            const slug = districtData ? districtData.slug : name.toLowerCase().replace(/\s+/g, '-');
                            onDistrictSelect(slug);
                        }
                    }
                });
            }
        }
        // Handle DUN Labels
        else if (isDunMode) {
            const name = feature.properties.dun; // Format: "N.01 Ayer Hangat"

            layer.bindTooltip(name, {
                permanent: false,
                direction: 'center',
                className: 'dun-label font-bold text-[10px]'
            });

            if (interactive) {
                layer.on({
                    mouseover: (e) => {
                        e.target.setStyle({ fillOpacity: 0.8, weight: 2 });
                    },
                    mouseout: (e) => {
                        e.target.setStyle({ fillOpacity: 0.6, weight: 1 });
                    }
                });
            }
        }
        // Handle Parliament Labels & Interaction
        else {
            const code = feature.properties.code;
            const name = feature.properties.name;

            layer.bindTooltip(`${code} ${name}`, {
                permanent: false,
                direction: 'center',
                className: 'parliament-label font-black text-xs text-white drop-shadow-md'
            });

            if (interactive) {
                layer.on({
                    mouseover: (e) => {
                        e.target.setStyle({ fillOpacity: 0.9, weight: 4 });
                    },
                    mouseout: (e) => {
                        e.target.setStyle({ fillOpacity: 0.7, weight: 2 });
                    },
                    click: (e) => {
                        // Find matching parliament data from props
                        const pData = politicalData.find(p => p.code === code);
                        if (pData) {
                            // Show popup with info
                            const popupContent = `
                                <div class="p-4 min-w-[250px] font-sans">
                                    <div class="flex items-center space-x-3 mb-4 border-b pb-3">
                                        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-kedah-gold shadow-md">
                                            <img src="${pData.mp_photo_url}" class="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 class="font-black text-slate-800 text-base leading-tight">${pData.name}</h3>
                                            <span class="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase tracking-widest">${pData.code}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-4">
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ahli Parlimen</p>
                                        <p class="text-sm font-bold text-slate-800">${pData.mp_name}</p>
                                        <p class="text-[10px] font-black text-kedah-green uppercase">${pData.mp_party}</p>
                                    </div>

                                    <div class="space-y-2">
                                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Senarai DUN</p>
                                        <div class="grid grid-cols-1 gap-1.5">
                                            ${pData.duns.map(dun => `
                                                <div class="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                    <div>
                                                        <p class="text-[11px] font-bold text-slate-800">${dun.name}</p>
                                                        <p class="text-[9px] font-medium text-slate-400 leading-none">${dun.adun_name}</p>
                                                    </div>
                                                    <span class="text-[8px] font-black text-white bg-slate-800 px-1.5 py-0.5 rounded uppercase">${dun.adun_party}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            `;
                            L.popup()
                                .setLatLng(e.latlng)
                                .setContent(popupContent)
                                .openOn(layer._map);
                        }
                    }
                });
            }
        }
    };

    return (
        <div className="relative h-[520px] w-full overflow-hidden group/map transition-all">
            <MapContainer
                center={center}
                zoom={zoom}
                className="h-full w-full"
                style={{ background: 'transparent' }}
                scrollWheelZoom={false}
                zoomControl={interactive} // Initial state
                dragging={false} // Initial state
                doubleClickZoom={false}
                touchZoom={false}
                attributionControl={false}
            >
                <MapInteractionHandler interactive={interactive} lockView={lockView} />
                <GeoJSON
                    key={`${politicsMode}-layer`}
                    data={geoJsonData}
                    style={districtStyle}
                    onEachFeature={onEachDistrict}
                />

                {/* Normal Place Markers */}
                {(!politicalData || politicalData.length === 0) && markers.map(place => (
                    <Marker key={place.id} position={[place.lat, place.lng]}>
                        <Popup>
                            <div className="p-1 min-w-[150px]">
                                <h3 className="font-black text-sm text-slate-800 uppercase italic tracking-tight">{place.name}</h3>
                                <p className="text-[10px] font-bold text-kedah-green uppercase tracking-widest mb-2 opacity-70">{place.district_name}</p>
                                <a
                                    href={`/place/${place.slug}`}
                                    className="bg-kedah-green text-white text-[10px] px-4 py-2 rounded-xl block text-center font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-premium"
                                >
                                    Eksplorasi
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Political Markers */}
                {politicalData && politicalData.length > 0 && politicalData.map(poly => {
                    // Try to resolve lat/lng from various possible property names or defaulting
                    const lat = politicsMode === 'parlimen' ? (poly.parliament_lat || 6.12) : (poly.dun_lat || 6.12);
                    const lng = politicsMode === 'parlimen' ? (poly.parliament_lng || 100.37) : (poly.dun_lng || 100.37);

                    // Skip if valid coordinates are effectively missing (though we defaulted above for safety, better to check specifically if that was the intent)
                    if (!poly.code) return null;

                    return (
                        <Marker key={poly.id || poly.code} position={[lat, lng]}>
                            <Popup>
                                <div className="p-1 min-w-[200px]">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${poly.mp_party?.includes('PAS') || poly.adun_party?.includes('PAS') ? 'bg-green-600' : 'bg-blue-600'}`}>
                                            YB
                                        </div>
                                        <div>
                                            <h3 className="font-black text-sm text-slate-800 uppercase italic tracking-tight">{poly.name} ({poly.code})</h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{politicsMode === 'parlimen' ? 'Parlimen' : 'DUN'}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-2">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Wakil Rakyat</p>
                                        <p className="text-sm font-bold text-slate-800 leading-tight mb-1">
                                            {politicsMode === 'parlimen' ? poly.mp_name : poly.adun_name}
                                        </p>
                                        <span className="inline-block px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-500">
                                            {politicsMode === 'parlimen' ? poly.mp_party : poly.adun_party}
                                        </span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* District Spotlight Overlay */}
            {
                spotlight && (
                    <div className="absolute top-6 right-6 w-72 glass p-6 rounded-3xl shadow-glass border-white/40 z-[1000] animate-fade-in">
                        <button
                            onClick={() => setSpotlight(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-kedah-red transition-colors"
                        >
                            ✕
                        </button>
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-kedah-green flex items-center justify-center text-[10px] text-white font-bold">
                                K
                            </div>
                            <h4 className="font-black text-kedah-green uppercase tracking-tighter text-xl italic">{spotlight.name}</h4>
                        </div>
                        {/* Note: In a full implementation, we'd pass district data from Home.jsx */}
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {spotlight.description || `Peneraju keunikan dan warisan Kedah Darul Aman di daerah ${spotlight.name}.`}
                        </p>
                        {spotlight.specialties && spotlight.specialties.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Kepakaran Daerah</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {spotlight.specialties.map(s => (
                                        <span key={s} className="px-2 py-1 bg-white/50 text-[9px] font-bold text-kedah-green rounded-full shadow-sm">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div >
    );
};

export default Map;
