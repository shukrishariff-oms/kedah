import { MapPin, ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const isOpen = (openingHours) => {
    if (!openingHours) return null;
    try {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const parts = openingHours.split('-').map(p => p.trim());
        if (parts.length !== 2) return null;

        const parseTime = (t) => {
            const [time, modifier] = t.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (modifier === 'PM' && hours < 12) hours += 12;
            if (modifier === 'AM' && hours === 12) hours = 0;
            return hours * 60 + minutes;
        };

        const start = parseTime(parts[0]);
        const end = parseTime(parts[1]);

        // Handle overnight hours (e.g. 10 PM - 2 AM)
        if (start > end) {
            return currentTime >= start || currentTime <= end;
        }
        return currentTime >= start && currentTime <= end;
    } catch (e) {
        return null;
    }
};

export default function PlaceCard({ place }) {
    const mainPhoto = place.photos && place.photos.length > 0 ? place.photos[0].image : 'https://via.placeholder.com/400x300?text=Tiada+Gambar';

    return (
        <div className="premium-card group">
            <div className="aspect-[4/3] relative overflow-hidden">
                <img
                    src={mainPhoto}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {place.categories.slice(0, 2).map((cat, i) => (
                        <span key={i} className="px-3 py-1 bg-white/95 glass text-[9px] font-black rounded-full text-kedah-green uppercase tracking-widest shadow-sm">
                            {cat}
                        </span>
                    ))}
                </div>
                {place.opening_hours && (
                    <div className="absolute top-3 right-3">
                        {isOpen(place.opening_hours) ? (
                            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-green-500/90 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                <span>Buka</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 text-white/70 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                                <Clock size={10} />
                                <span>Tutup</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex items-center text-kedah-green text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-80">
                    <MapPin size={12} className="mr-1" />
                    <span>{place.district_name}</span>
                </div>

                <h3 className="font-black text-slate-800 text-lg line-clamp-1 mb-2 group-hover:text-kedah-green transition-colors uppercase tracking-tight italic">
                    {place.name}
                </h3>

                <p className="text-slate-500 text-xs line-clamp-2 mb-6 leading-relaxed h-8">
                    {place.description}
                </p>

                <Link
                    to={`/place/${place.slug}`}
                    className="flex items-center justify-between w-full p-4 bg-slate-50 group-hover:bg-kedah-green text-kedah-green group-hover:text-white font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all duration-300 shadow-inner group/btn"
                >
                    <span>Terokai Lokasi</span>
                    <div className="p-1 bg-white rounded-full text-kedah-green shadow-premium group-hover:scale-110 transition-transform">
                        <ArrowRight size={14} />
                    </div>
                </Link>
            </div>
        </div>
    )
}
