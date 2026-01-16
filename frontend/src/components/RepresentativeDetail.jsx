import { User, Award, ArrowRight } from 'lucide-react';

const RepresentativeDetail = ({ selectedDistrict, districts, politicalData, politicsMode }) => {

    // 1. Find the District Name from Slug
    const districtObj = districts?.find(d => d.slug === selectedDistrict);
    const districtName = districtObj?.name;

    // 2. Find the Political Data matching this district
    // Note: Fuzzy match since API might return "Langkawi" and district is "Langkawi"
    const data = politicalData?.find(p =>
        p.name?.toLowerCase() === districtName?.toLowerCase() ||
        p.code === selectedDistrict // Fallback if slug matches code
    );

    // Default State (No Selection)
    if (!selectedDistrict || !data) {
        return (
            <div className="h-full flex flex-col justify-center p-8 bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-xl">
                <div className="w-16 h-16 bg-kedah-gold/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <ArrowRight size={32} className="text-kedah-gold" />
                </div>
                <h2 className="text-4xl font-black text-slate-800 mb-4 leading-tight">
                    Kenali Wakil <br />
                    <span className="text-kedah-green">Rakyat Anda</span>
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                    Pilih mana-mana daerah di peta sebelah untuk melihat maklumat Ahli Parlimen atau ADUN di kawasan tersebut.
                </p>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <div className="w-8 h-1 bg-slate-200 rounded-full"></div>
                    <span>Info Politik Kedah</span>
                </div>
            </div>
        );
    }

    const { mp_name, mp_party, mp_photo_url, adun_name, adun_party, adun_photo_url, name, code } = data;
    const roleName = politicsMode === 'parlimen' ? mp_name : adun_name;
    const party = politicsMode === 'parlimen' ? mp_party : adun_party;
    const photo = politicsMode === 'parlimen' ? mp_photo_url : adun_photo_url;

    // Party Styling Logic
    const getPartyColor = (p) => {
        if (!p) return 'text-slate-500';
        if (p.includes('PAS') || p.includes('PN')) return 'text-green-600';
        if (p.includes('PH') || p.includes('PKR')) return 'text-red-600';
        if (p.includes('BN')) return 'text-blue-700';
        return 'text-slate-600';
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white ring-1 ring-slate-100/50 animate-fade-in-up">
            {/* Image Section */}
            <div className="relative h-64 w-full bg-slate-100 overflow-hidden group">
                {photo ? (
                    <img
                        src={photo}
                        alt={roleName}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <User size={64} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                <div className="absolute bottom-6 left-6 text-white">
                    <span className="inline-block px-2 py-1 bg-kedah-gold text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-md mb-2 shadow-sm">
                        {code}
                    </span>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter drop-shadow-md">
                        {name}
                    </h3>
                </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 p-8 flex flex-col justify-between bg-white relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[4rem] -z-0"></div>

                <div className="relative z-10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                        {politicsMode === 'parlimen' ? 'Ahli Parlimen' : 'Ahli DUN'}
                    </p>
                    <h2 className="text-3xl font-black text-slate-800 leading-none mb-2">
                        {roleName}
                    </h2>
                    <div className="flex items-center space-x-2 mb-6">
                        <Award size={16} className={getPartyColor(party)} />
                        <span className={`text-sm font-bold uppercase tracking-wide ${getPartyColor(party)}`}>
                            {party}
                        </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                        Berkhidmat untuk rakyat kawasan {name}. Komited dalam memacu pembangunan dan kebajikan setempat.
                    </p>
                </div>

                <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-kedah-green transition-colors shadow-lg flex items-center justify-center gap-2 group">
                    Lihat Profil Penuh
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default RepresentativeDetail;
