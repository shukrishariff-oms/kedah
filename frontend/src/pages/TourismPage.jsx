import { useState, useEffect } from 'react'
import { getDistricts } from '../api/districts'
import { getPlaces } from '../api/places'
import Map from '../components/Map'
import PlaceCard from '../components/PlaceCard'
import { Search, Map as MapIcon, Grid } from 'lucide-react'

export default function TourismPage({ title, category, description }) {
    const [districts, setDistricts] = useState([])
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const dRes = await getDistricts();
                setDistricts(dRes.data || []);

                const pRes = await getPlaces({
                    q: search,
                    district: selectedDistrict,
                });

                let filteredPlaces = pRes.data || [];

                // Filter by category if provided
                if (category && category !== 'Semua') {
                    filteredPlaces = filteredPlaces.filter(p =>
                        p.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
                    );
                }

                setPlaces(filteredPlaces);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [search, selectedDistrict, category]);

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            {/* Hero Section */}
            <div className="mb-12 text-center md:text-left">
                <h2 className="text-4xl font-black text-kedah-green mb-4 leading-tight uppercase tracking-tighter">
                    {title} <span className="text-kedah-gold">Kedah</span>
                </h2>
                <p className="text-slate-500 max-w-2xl leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between glass p-6 rounded-3xl shadow-glass border-white/40">
                <div className="relative w-full lg:w-1/2">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Cari lokasi menarik..."
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border-none shadow-premium focus:ring-4 focus:ring-kedah-green/10 transition-all text-sm font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
                    <div className="flex gap-2 bg-white/50 p-1.5 rounded-2xl shadow-inner border border-white/20">
                        <select
                            className="bg-transparent px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none min-w-[160px]"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            <option value="">Semua Daerah</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.slug}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Map Section */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center space-x-3 text-slate-800">
                        <div className="p-2 bg-kedah-green rounded-lg shadow-premium">
                            <MapIcon size={18} className="text-white" />
                        </div>
                        <span className="font-black uppercase tracking-tighter text-lg">Peta Eksplorasi</span>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 bg-white ring-1 ring-slate-100">
                        <Map
                            markers={places}
                            districts={districts}
                            interactive={true}
                            onDistrictSelect={setSelectedDistrict}
                        />
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center justify-between text-slate-800">
                        <div className="flex items-center space-x-3 text-slate-800">
                            <div className="p-2 bg-kedah-gold rounded-lg shadow-premium">
                                <Grid size={18} className="text-kedah-green" />
                            </div>
                            <span className="font-black uppercase tracking-tighter text-lg">Senarai Lokasi</span>
                        </div>
                        <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">{places.length} Lokasi</span>
                    </div>
                    <div className="grid grid-cols-1 gap-6 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
                        {loading ? (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-12 h-12 border-4 border-kedah-green border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Memuatkan data...</p>
                            </div>
                        ) : places.length > 0 ? (
                            places.map(p => <PlaceCard key={p.id} place={p} />)
                        ) : (
                            <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                <p className="text-slate-400 text-sm font-medium">Tiada lokasi ditemui.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
