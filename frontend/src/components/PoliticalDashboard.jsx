import { User, Award, CheckCircle2, MapPin } from 'lucide-react';

const PoliticalDashboard = ({ politicalData, politicsMode, selectedDistrict, districts }) => {

    // Helper to determine styling based on party
    const getPartyStyle = (party) => {
        if (!party) return { color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200', glow: 'from-slate-400 to-slate-300' };

        const p = party.toUpperCase();
        if (p.includes('PAS')) return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', glow: 'from-green-500 to-emerald-400' };
        if (p.includes('PH') || p.includes('PKR') || p.includes('DAP') || p.includes('AMANAH')) return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', glow: 'from-red-500 to-rose-400' };
        if (p.includes('BN') || p.includes('UMNO')) return { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', glow: 'from-blue-600 to-indigo-500' };
        if (p.includes('PN') || p.includes('BERSATU') || p.includes('GERAKAN')) return { color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-200', glow: 'from-sky-500 to-cyan-400' };

        return { color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', glow: 'from-slate-400 to-slate-300' };
    };

    // Filter Data Logic
    const districtName = districts?.find(d => d.slug === selectedDistrict)?.name;

    // Filter data based on selected district if available
    // Note: In a real app we would filter by district_id. 
    // For now we assume the data passed is okay to show, OR we implement client side filtering if we can match names.
    // However, since we want to show 'Tiada Data' if nothing selected, we just rely on selectedDistrict prop.
    const filteredData = politicalData;

    return (
        <div className="w-full min-h-[300px] animate-fade-in relative z-10 py-10">

            {/* Header Section */}
            <div className="text-center mb-10 relative">
                <span className="inline-block py-1 px-3 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 text-[10px] font-black tracking-widest uppercase text-slate-500 mb-4 shadow-sm">
                    {selectedDistrict ? `Fokus Daerah: ${districtName}` : 'Kepimpinan Negeri'}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-3">
                    {politicsMode === 'parlimen' ? 'Ahli Parlimen' : 'Ahli Dewan Undangan Negeri'}
                </h2>
                {!selectedDistrict && (
                    <p className="text-slate-500 text-sm animate-bounce mt-4">
                        👇 Sila pilih daerah di peta &quot;Peta Eksplorasi&quot; di atas
                    </p>
                )}
            </div>

            {/* Content Logic */}
            {!selectedDistrict ? (
                <div className="flex flex-col items-center justify-center p-12 glass rounded-3xl border border-white/50 text-slate-400 text-center mx-4 opacity-50 hover:opacity-100 transition-opacity">
                    <MapPin size={48} className="mb-4 text-kedah-gold animate-pulse" />
                    <p className="font-bold text-lg text-slate-600 mb-1">Terokai Mengikut Kawasan</p>
                    <p className="text-xs uppercase tracking-widest">Klik mana-mana daerah di peta untuk lihat Ahli Parlimen</p>
                </div>
            ) : (
                <div className="relative group/container">
                    {/* Scroll Container */}
                    <div className="flex overflow-x-auto gap-6 px-8 pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0 mask-linear-fade justify-center">
                        {filteredData.map((poly) => {
                            const style = getPartyStyle(politicsMode === 'parlimen' ? poly.mp_party : poly.adun_party);
                            const roleName = politicsMode === 'parlimen' ? poly.mp_name : poly.adun_name;
                            const roleParty = politicsMode === 'parlimen' ? poly.mp_party : poly.adun_party;
                            const region = poly.name;
                            const code = poly.code;
                            const photo = politicsMode === 'parlimen' ? poly.mp_photo_url : poly.adun_photo_url;

                            return (
                                <div
                                    key={poly.id || code}
                                    className="min-w-[280px] md:min-w-[300px] snap-center group relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-4 shadow-xl shadow-slate-200/50 border border-white/60 hover:-translate-y-2 transition-all duration-500 ease-out hover:shadow-2xl hover:bg-white/90"
                                >
                                    {/* Top Badge - Code */}
                                    <div className="absolute top-0 right-0 p-5 z-20">
                                        <div className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg tracking-wider">
                                            {code}
                                        </div>
                                    </div>

                                    <div className="relative flex flex-col items-center pt-8 pb-6">

                                        {/* Avatar with Glow Ring */}
                                        <div className="relative mb-6">
                                            {/* Dynamic Glow */}
                                            <div className={`absolute -inset-1 bg-gradient-to-tr ${style.glow} rounded-full opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-500`}></div>

                                            <div className="relative w-28 h-28 rounded-full border-[4px] border-white shadow-lg overflow-hidden bg-slate-100 object-top">
                                                {photo ? (
                                                    <img
                                                        src={photo}
                                                        alt={roleName}
                                                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-in-out"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <User size={48} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Checkmark Badge */}
                                            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-sm z-10">
                                                <div className="bg-blue-500 rounded-full p-0.5">
                                                    <CheckCircle2 size={10} className="text-white" strokeWidth={3} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Info */}
                                        <div className="text-center w-full px-2">
                                            {/* Name */}
                                            <h3 className="text-lg font-black text-slate-800 leading-tight mb-2 line-clamp-2 h-12 flex items-center justify-center group-hover:text-black transition-colors">
                                                {roleName}
                                            </h3>

                                            {/* Region Name */}
                                            <div className="flex items-center justify-center space-x-1.5 mb-4 text-slate-500">
                                                <MapPin size={12} className="text-kedah-gold" />
                                                <span className="text-[11px] font-bold uppercase tracking-widest">{region}</span>
                                            </div>

                                            {/* Party Pill */}
                                            <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-xl border ${style.bg} ${style.border} transition-all duration-300 group-hover:shadow-sm`}>
                                                <Award size={14} className={style.color} />
                                                <span className={`text-[11px] font-black uppercase ${style.color}`}>
                                                    {roleParty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Fade Edges Indicators */}
                    <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-white/80 to-transparent pointer-events-none md:rounded-l-3xl"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-white/80 to-transparent pointer-events-none md:rounded-r-3xl"></div>
                </div>
            )}
        </div>
    );
};

export default PoliticalDashboard;
