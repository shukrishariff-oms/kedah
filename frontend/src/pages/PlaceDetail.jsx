import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPlace } from '../api/places'
import { MapPin, Phone, Clock, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

export default function PlaceDetail() {
    const { slug } = useParams()
    const [place, setPlace] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activePhoto, setActivePhoto] = useState(0)

    useEffect(() => {
        async function fetchPlace() {
            try {
                const res = await getPlace(slug)
                setPlace(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchPlace()
    }, [slug])

    if (loading) return <div className="p-20 text-center">Memuatkan...</div>
    if (!place) return <div className="p-20 text-center">Tempat tidak ditemui.</div>

    const photos = place.photos && place.photos.length > 0
        ? place.photos
        : [{ image: 'https://via.placeholder.com/800x400?text=Tiada+Gambar', caption: 'Tiada Gambar' }];

    return (
        <div className="animate-fade-in pb-20">
            {/* Top Navigation */}
            <div className="bg-white border-b border-slate-100 py-4 sticky top-[89px] z-40 shadow-sm">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="inline-flex items-center text-slate-500 hover:text-kedah-green font-bold text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft size={16} className="mr-2" />
                        Kembali ke Peta
                    </Link>
                    <div className="flex gap-2">
                        {place.categories.slice(0, 1).map((cat, i) => (
                            <span key={i} className="px-3 py-1 bg-kedah-green/5 text-kedah-green text-[10px] font-black rounded-full uppercase tracking-widest scale-90">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full bg-slate-100">
                <img
                    src={photos[activePhoto].image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Photo Controls */}
                {photos.length > 1 && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-6 pointer-events-none">
                        <button
                            onClick={() => setActivePhoto(prev => (prev === 0 ? photos.length - 1 : prev - 1))}
                            className="p-4 rounded-full glass border-white/20 text-white hover:scale-110 transition-transform pointer-events-auto"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => setActivePhoto(prev => (prev === photos.length - 1 ? 0 : prev + 1))}
                            className="p-4 rounded-full glass border-white/20 text-white hover:scale-110 transition-transform pointer-events-auto"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* Place Identity */}
                <div className="absolute bottom-10 left-0 w-full">
                    <div className="container mx-auto px-6">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic drop-shadow-2xl">
                            {place.name}
                        </h1>
                        <div className="flex items-center text-kedah-gold font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                            <MapPin size={16} className="mr-2" />
                            <span>{place.district_name}, KEDAH DARUL AMAN</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 -mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left: About & Description */}
                    <div className="lg:col-span-12">
                        <div className="premium-card p-10 md:p-14">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                                <div className="lg:col-span-2">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-8 h-1 bg-kedah-green rounded-full"></div>
                                        <span className="font-black uppercase tracking-widest text-xs text-slate-400">Tentang Lokasi</span>
                                    </div>
                                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
                                        {place.description}
                                    </p>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-10 border-t border-slate-50 leading-relaxed">
                                        {place.categories.map((cat, i) => (
                                            <div key={i} className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Tagging</span>
                                                <span className="text-xs font-bold text-slate-700">{cat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-8 h-1 bg-kedah-gold rounded-full"></div>
                                        <span className="font-black uppercase tracking-widest text-xs text-slate-400">Butiran Hubungan</span>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-start group">
                                            <div className="p-3 bg-slate-100 rounded-xl mr-4 group-hover:bg-kedah-green group-hover:text-white transition-colors">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-[10px] text-slate-300 uppercase tracking-[0.2em] mb-1">Alamat</h4>
                                                <p className="text-sm font-bold text-slate-600">{place.address}</p>
                                            </div>
                                        </div>

                                        {place.phone && (
                                            <div className="flex items-start group">
                                                <div className="p-3 bg-slate-100 rounded-xl mr-4 group-hover:bg-kedah-green group-hover:text-white transition-colors">
                                                    <Phone size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-[10px] text-slate-300 uppercase tracking-[0.2em] mb-1">Telefon</h4>
                                                    <p className="text-sm font-bold text-slate-600">{place.phone}</p>
                                                </div>
                                            </div>
                                        )}

                                        {place.opening_hours && (
                                            <div className="flex items-start group">
                                                <div className="p-3 bg-slate-100 rounded-xl mr-4 group-hover:bg-kedah-green group-hover:text-white transition-colors">
                                                    <Clock size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-[10px] text-slate-300 uppercase tracking-[0.2em] mb-1">Operasi</h4>
                                                    <p className="text-sm font-bold text-slate-600 whitespace-pre-line leading-relaxed">{place.opening_hours}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {place.google_maps_url && (
                                        <div className="pt-6">
                                            <a
                                                href={place.google_maps_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-3 w-full py-5 bg-kedah-green text-white font-black rounded-2xl shadow-premium hover:bg-slate-800 transition-all uppercase tracking-[0.2em] text-[10px] transform hover:scale-[1.02] active:scale-95"
                                            >
                                                <ExternalLink size={18} />
                                                Navigasi Sekarang
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
