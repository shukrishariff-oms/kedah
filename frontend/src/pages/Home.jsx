import { useState, useEffect } from 'react'
import { getPlaces } from '../api/places'
import { getDistricts } from '../api/districts'
import { Search, ArrowRight, MapPin, Coffee, Landmark, Mountain } from 'lucide-react'
import PlaceCard from '../components/PlaceCard'
import Map from '../components/Map'

export default function Home() {
    const [places, setPlaces] = useState([])
    const [districts, setDistricts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const pRes = await getPlaces(); // Get all places
                const dRes = await getDistricts();

                // Shuffle or pick random highlights for now
                setPlaces(pRes.data || []);
                setDistricts(dRes.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Get top 4 places for highlights
    const highlights = places.slice(0, 4);

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 1. Hero Section */}
            <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Background (Gradient for now, would be video/image) */}
                <div className="absolute inset-0 bg-gradient-to-br from-kedah-green to-slate-900 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8 animate-fade-in-up">
                    <span className="inline-block py-1 px-4 rounded-full border border-white/30 text-white/80 text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
                        Official Tourism Map
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter shadow-black drop-shadow-2xl">
                        JELAJAHI <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-kedah-gold to-yellow-300">NEGERI KEDAH</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Dari sawah padi menghijau hingga ke puncak Gunung Jerai.
                        Temui syurga makanan, warisan sejarah, dan permata tersembunyi.
                    </p>

                    {/* Search Bar in Hero */}
                    <div className="bg-white/10 backdrop-blur-lg p-2 rounded-full border border-white/20 max-w-lg mx-auto flex items-center shadow-2xl">
                        <div className="bg-white text-slate-900 mx-2 p-2 rounded-full">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari destinasi..."
                            className="bg-transparent border-none text-white placeholder-white/60 focus:ring-0 flex-1 px-4 font-medium"
                        />
                        <button className="bg-kedah-gold text-kedah-green px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white transition-all">
                            Cari
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. Category Direct Links */}
            <section className="container mx-auto px-6 -mt-24 relative z-20 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <CategoryCard
                        title="Syurga Makanan"
                        icon={<Coffee size={32} />}
                        link="/food"
                        description="Hameediyah, Laksa, Nasi Kandar."
                        color="bg-orange-500"
                    />
                    <CategoryCard
                        title="Hidden Gems"
                        icon={<Mountain size={32} />}
                        link="/hidden-gems"
                        description="Air terjun & lokasi viral."
                        color="bg-teal-500"
                    />
                    <CategoryCard
                        title="Jejak Sejarah"
                        icon={<Landmark size={32} />}
                        link="/history"
                        description="Lembah Bujang, Alor Setar."
                        color="bg-amber-700"
                    />
                    <CategoryCard
                        title="Info Politik"
                        icon={<MapPin size={32} />}
                        link="/politics"
                        description="Kenali wakil rakyat anda."
                        color="bg-purple-600"
                    />
                </div>
            </section>

            {/* 3. Featured Highlights (Curated) */}
            <section className="container mx-auto px-6 mb-24">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase mb-2">Destinasi <span className="text-kedah-green">Pilihan</span></h2>
                        <p className="text-slate-500">Lokasi wajib singgah bulan ini.</p>
                    </div>
                    <a href="/food" className="hidden md:flex items-center space-x-2 text-kedah-green font-bold text-sm uppercase tracking-widest group">
                        <span>Lihat Semua</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {highlights.map(place => (
                        <PlaceCard key={place.id} place={place} />
                    ))}
                </div>
            </section>

            {/* 4. Map Utility Section */}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-kedah-green/10 blur-3xl rounded-full translate-x-1/2"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-4 space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none">
                                Peta <br /><span className="text-kedah-gold">Interaktif</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Merancng perjalanan lebih mudah dengan peta interaktif kami. Lihat daerah, parlimen, dan lokasi menarik dalam satu pandangan.
                            </p>
                            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-kedah-gold hover:text-kedah-green transition-all shadow-premium flex items-center space-x-3 w-fit">
                                <span>Buka Peta Penuh</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="lg:col-span-8">
                            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 bg-slate-800 ring-1 ring-white/20 h-[500px]">
                                <Map
                                    markers={places}
                                    districts={districts}
                                    interactive={true}
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function CategoryCard({ title, icon, link, description, color }) {
    return (
        <a href={link} className="group block bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100 relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-16 ${color} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform duration-500`}></div>
            <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
                    {icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
            </div>
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-slate-300">
                <ArrowRight />
            </div>
        </a>
    )
}
