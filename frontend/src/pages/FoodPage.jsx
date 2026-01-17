import { useState, useEffect, useRef } from 'react'
import { getPlaces } from '../api/places'
import { getDistricts } from '../api/districts'
import Map from '../components/Map'
import PlaceCard from '../components/PlaceCard'
import { Utensils, MapPin, Coffee, ArrowRight, Search, Map as MapIcon, X } from 'lucide-react'

export default function FoodPage() {
    const [places, setPlaces] = useState([])
    const [districts, setDistricts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')

    // Featured Food (Should ideally come from API, but hardcoded for "Iconic" feel)
    const featuredDishes = [
        { id: 'f1', title: 'Nasi Kandar', image: 'https://images.unsplash.com/photo-1599020972412-2c6762391ce4?q=80&w=800', desc: 'Kuah banjir yang padu.' },
        { id: 'f2', title: 'Laksa Kedah', image: 'https://images.unsplash.com/photo-1628280665799-a8c08cb1744b?q=80&w=800', desc: 'Asam laksa dengan ikan fresh.' },
        { id: 'f3', title: 'Gulai Kawah', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485c?q=80&w=800', desc: 'Resepi turun temurun.' },
        { id: 'f4', title: 'Kuih Tradisional', image: 'https://images.unsplash.com/photo-1601362758113-1f7c568972e3?q=80&w=800', desc: 'Pemanis mulut asli.' },
    ]

    const exploreRef = useRef(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                // Fetch All Districts
                const dRes = await getDistricts();
                setDistricts(dRes.data || []);

                // Fetch Places (filtered by search & district)
                const pRes = await getPlaces({
                    q: search,
                    district: selectedDistrict,
                });

                // Filter strictly for food related categories
                let filtered = pRes.data || [];
                filtered = filtered.filter(p =>
                    p.categories.some(c => ['food', 'makan', 'cafe', 'restaurant', 'warung'].includes(c.toLowerCase()))
                );

                setPlaces(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [search, selectedDistrict]);

    const scrollToExplore = () => {
        exploreRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="bg-slate-50 min-h-screen animate-fade-in">
            {/* 1. Specialized Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2000"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        alt="Background"
                    />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-md border border-orange-500/50 px-4 py-1.5 rounded-full text-orange-200 text-xs font-bold uppercase tracking-widest">
                        <Utensils size={14} />
                        <span>Gastronomi Kedah</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl">
                        SYURGA <span className="text-kedah-gold">MAKANAN</span>
                    </h1>
                    <p className="text-lg text-slate-200 max-w-2xl mx-auto font-medium">
                        Dari warung tepi jalan ke restoran viral. Terokai kepelbagaian rasa yang memikat selera di Jelapang Padi.
                    </p>
                    <button onClick={scrollToExplore} className="mt-8 bg-kedah-gold text-kedah-green px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-premium flex items-center space-x-2 mx-auto">
                        <span>Cari Lokasi Makan</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            {/* 2. Iconic Dishes Carousel */}
            <div className="container mx-auto px-6 -mt-16 relative z-20 mb-20 overflow-x-auto pb-4 hide-scrollbar">
                <div className="flex space-x-6 min-w-max">
                    {featuredDishes.map(dish => (
                        <div key={dish.id} className="w-64 bg-white p-3 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-100 group">
                            <div className="h-40 overflow-hidden rounded-xl mb-3 relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={dish.image} alt={dish.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <h3 className="text-slate-800 font-black uppercase text-sm tracking-tight">{dish.title}</h3>
                            <p className="text-xs text-slate-500">{dish.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Main Exploration Area (Split View) */}
            <div ref={exploreRef} className="container mx-auto px-6 pb-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase flex items-center gap-3">
                            <MapPin className="text-orange-500" />
                            Cari Mengikut <span className="text-kedah-green border-b-4 border-kedah-gold">Daerah</span>
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm">Pilih daerah di peta atau guna carian.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari kedai, menu..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-bold text-slate-700"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Popular Districts Quick Filter */}
                {!selectedDistrict && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest py-2 mr-2">Popular:</span>
                        {['Kota Setar', 'Langkawi', 'Kuala Muda', 'Kubang Pasu'].map(slug => {
                            const dist = districts.find(d => d.name.toLowerCase().includes(slug.toLowerCase()) || d.slug === slug.toLowerCase().replace(' ', '-'));
                            if (!dist) return null;
                            return (
                                <button
                                    key={dist.id}
                                    onClick={() => setSelectedDistrict(dist.slug)}
                                    className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
                                >
                                    {dist.name}
                                </button>
                            )
                        })}
                    </div>
                )}

                {/* Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

                    {/* Left: Sticky Map */}
                    <div className="lg:col-span-5 static lg:sticky lg:top-28 z-10">
                        <div className="bg-white p-2 rounded-[2rem] shadow-2xl ring-1 ring-slate-100 border-4 border-white/50">
                            <div className="h-[400px] lg:h-[600px] w-full rounded-[1.5rem] overflow-hidden relative">
                                <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm border border-slate-100">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        {selectedDistrict ? 'Lokasi Dipilih' : 'Peta Interaktif'}
                                    </p>
                                </div>
                                <Map
                                    markers={places}
                                    districts={districts}
                                    interactive={true}
                                    onDistrictSelect={setSelectedDistrict}
                                    className="w-full h-full"
                                    lockView={false} // Allow user to zoom/pan
                                    activeDistrict={selectedDistrict} // Pass active district if map supports highlighting styling
                                />
                                {selectedDistrict && (
                                    <button
                                        onClick={() => setSelectedDistrict('')}
                                        className="absolute bottom-4 right-4 z-[400] bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                                    >
                                        <X size={14} />
                                        Reset Peta
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Content Grid */}
                    <div className="lg:col-span-7 min-h-[600px]">
                        {/* Status Header */}
                        <div className="mb-6 flex justify-between items-center">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                                {selectedDistrict ? (
                                    <span>Makan di <span className="text-orange-500">{districts.find(d => d.slug === selectedDistrict)?.name}</span></span>
                                ) : 'Semua Lokasi'}
                            </h3>
                            <span className="text-xs font-bold bg-slate-200 text-slate-600 px-3 py-1 rounded-full">
                                {places.length} Jumpaan
                            </span>
                        </div>

                        {/* The Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <div key={i} className="bg-white rounded-3xl h-64 animate-pulse"></div>
                                ))
                            ) : places.length > 0 ? (
                                places.map(place => (
                                    <PlaceCard key={place.id} place={place} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                    <Coffee className="mx-auto text-slate-300 mb-4" size={48} />
                                    <p className="text-slate-500 font-medium">Tiada lokasi makan dijumpai di kawasan ini.</p>
                                    <button onClick={() => setSelectedDistrict('')} className="mt-4 text-orange-500 font-bold text-sm hover:underline">
                                        Lihat Semua Kawasan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
