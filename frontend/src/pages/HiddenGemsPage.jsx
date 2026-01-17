import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Compass, Mountain, Trees, Search, ArrowRight, Camera, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import MapComponent from '../components/Map'
import PlaceCard from '../components/PlaceCard'
import { getPlaces, getDistricts } from '../api/places'

export default function HiddenGemsPage() {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [districts, setDistricts] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [activeLevel, setActiveLevel] = useState(null)

    // Mock Data for Hidden Gems
    const mockGems = [
        { id: 201, name: 'Gunung Baling', district_name: 'Baling', categories: ['Hidden Gem', 'Hiking', 'Nature'], lat: 5.67, lng: 100.91, description: 'Pendakian singkat dengan pemandangan awan karpet yang memukau.', slug: 'gunung-baling', photos: [{ image: 'https://images.unsplash.com/photo-1589556264800-08ae9e62357a?q=80&w=400' }] },
        { id: 202, name: 'Air Terjun Junjong', district_name: 'Kulim', categories: ['Hidden Gem', 'Waterfall', 'Santai'], lat: 5.43, lng: 100.56, description: 'Air terjun bertingkat yang sesuai untuk piknik keluarga.', slug: 'air-terjun-junjong', photos: [{ image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=400' }] },
        { id: 203, name: 'Tasik Pedu', district_name: 'Padang Terap', categories: ['Hidden Gem', 'Lake', 'Boating'], lat: 6.25, lng: 100.75, description: 'Tasik buatan manusia yang tenang, dikelilingi hutan hujan dara.', slug: 'tasik-pedu', photos: [{ image: 'https://images.unsplash.com/photo-1545562085-5036b0461629?q=80&w=400' }] },
        { id: 204, name: 'Pantai Merdeka', district_name: 'Kuala Muda', categories: ['Hidden Gem', 'Beach', 'Santai'], lat: 5.68, lng: 100.36, description: 'Pantai peranginan santai bertentangan dengan Tanjung Dawai.', slug: 'pantai-merdeka', photos: [{ image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400' }] },
        { id: 205, name: 'Tree Top Walk', district_name: 'Kulim', categories: ['Hidden Gem', 'Adventure', 'Nature'], lat: 5.40, lng: 100.80, description: 'Laluan kanopi terpanjang di dunia di Hutan Simpan Sedim.', slug: 'tree-top-walk', photos: [{ image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=400' }] },
        { id: 206, name: 'Gua Sireh', district_name: 'Baling', categories: ['Hidden Gem', 'Cave', 'Extreme'], lat: 5.65, lng: 100.90, description: 'Gua batu kapur yang mencabar untuk diterokai.', slug: 'gua-sireh', photos: [{ image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400' }] }
    ]

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                // Fetch Districts
                const dRes = await getDistricts().catch(() => ({ data: [] }));
                setDistricts(dRes.data || []);

                // Try Fetch Places (will fail if backend down)
                const pRes = await getPlaces({ category: 'Hidden Gem' });
                let filtered = pRes.data || [];

                if (filtered.length === 0) {
                    filtered = mockGems;
                }

                // Client-side filtering
                filtered = filtered.filter(p => {
                    const matchDistrict = selectedDistrict ?
                        (p.district_name?.toLowerCase().replace(/\s+/g, '-') === selectedDistrict.toLowerCase()) : true;

                    const matchLevel = activeLevel ?
                        p.categories.some(c => c.toLowerCase() === activeLevel.toLowerCase()) : true;

                    const matchSearch = search ?
                        (p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.description.toLowerCase().includes(search.toLowerCase())) : true;

                    return matchDistrict && matchLevel && matchSearch;
                });

                setPlaces(filtered);
            } catch (err) {
                // Filter Mock Data directly on error
                let filtered = mockGems.filter(p => {
                    const matchDistrict = selectedDistrict ?
                        (p.district_name?.toLowerCase().replace(/\s+/g, '-') === selectedDistrict.toLowerCase()) : true;

                    const matchLevel = activeLevel ?
                        p.categories.some(c => c.toLowerCase() === activeLevel.toLowerCase()) : true;

                    const matchSearch = search ?
                        (p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.description.toLowerCase().includes(search.toLowerCase())) : true;

                    return matchDistrict && matchLevel && matchSearch;
                });
                setPlaces(filtered);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [search, selectedDistrict, activeLevel]);

    const levels = [
        { label: 'Semua', key: null, icon: <Map size={18} /> },
        { label: 'Santai', key: 'Santai', icon: <Camera size={18} /> },
        { label: 'Hiking', key: 'Hiking', icon: <Mountain size={18} /> },
        { label: 'Air', key: 'Waterfall', icon: <Compass size={18} /> }, // Waterfall/Lake/Beach fallback
        { label: 'Extreme', key: 'Extreme', icon: <Zap size={18} /> }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1533282245946-4c74032d8471?q=80&w=2000"
                        alt="Hidden Gems Kedah"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/30"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6"
                    >
                        <Trees className="text-green-400" size={16} />
                        <span className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">Xplorasi Alam Semulajadi</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
                        PERMATA <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">TERSEMBUNYI</span>
                    </h1>

                    <p className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Temui lokasi rahsia, air terjun misteri, dan puncak gunung yang belum diterokai ramai di Kedah Darul Aman.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel: Map & Filters */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Map Card */}
                        <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100">
                            <h3 className="flex items-center space-x-2 text-slate-800 font-black uppercase tracking-tight mb-4 px-2">
                                <Compass className="text-emerald-500" size={20} />
                                <span>Peta Lokasi</span>
                            </h3>
                            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                                <MapComponent
                                    activeDistrict={selectedDistrict}
                                    onDistrictSelect={setSelectedDistrict}
                                    markers={places}
                                    interactive={true}
                                />
                            </div>
                            <p className="text-center text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest">
                                Pilih daerah di peta untuk tapis
                            </p>
                        </div>

                        {/* Level Filter */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                            <h3 className="text-slate-800 font-black uppercase tracking-tight mb-4">Tahap Cabaran</h3>
                            <div className="flex flex-wrap gap-2">
                                {levels.map(level => (
                                    <button
                                        key={level.label}
                                        onClick={() => setActiveLevel(level.key)}
                                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeLevel === level.key
                                            ? 'bg-emerald-600 text-white shadow-lg scale-105'
                                            : 'bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                                            }`}
                                    >
                                        {level.icon}
                                        <span>{level.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Results */}
                    <div className="lg:col-span-8">
                        {/* Search Bar */}
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-8 sticky top-24 z-30">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm font-bold tracking-wide"
                                    placeholder="Cari lokasi rahsia..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-64 bg-slate-200 rounded-3xl"></div>
                                ))}
                            </div>
                        ) : places.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {places.map((place, idx) => (
                                    <motion.div
                                        key={place.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <PlaceCard place={place} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                                <Trees className="mx-auto h-16 w-16 text-slate-200 mb-4" />
                                <h3 className="text-slate-400 font-bold uppercase tracking-widest">Tiada lokasi ditemui</h3>
                                <button
                                    onClick={() => { setSelectedDistrict(null); setActiveLevel(null); setSearch('') }}
                                    className="mt-4 text-emerald-600 text-xs font-black uppercase hover:underline"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
