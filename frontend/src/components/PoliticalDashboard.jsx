import { User, Award, CheckCircle2, Star } from 'lucide-react';

const PoliticalDashboard = ({ politicalData, politicsMode }) => {
    // Group data by status if needed, or just list them premium style

    return (
        <div className="w-full min-h-[500px] animate-fade-in relative z-10">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-kedah-yellow/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-kedah-green/5 rounded-full blur-3xl -z-10"></div>

            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-kedah-gold/20 to-transparent px-4 py-1.5 rounded-full border border-kedah-gold/30 mb-3 shadow-sm">
                    <Star size={14} className="text-kedah-yellow fill-kedah-yellow" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-kedah-yellow">Dewan & Kepimpinan</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-800 tracking-tighter mb-2">
                    {politicsMode === 'parlimen' ? 'Ahli Parlimen' : 'Ahli Dewan Undangan Negeri'}
                </h2>
                <p className="text-slate-500 font-medium italic">Senarai kepimpinan negeri Kedah Darul Aman</p>
            </div>

            {/* Grid Layout */}
            {politicalData.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 glass rounded-3xl border-dashed border-2 border-slate-200 text-slate-400">
                    <User size={48} className="mb-4 opacity-20" />
                    <p className="font-bold tracking-widest uppercase text-xs">Tiada Data Ditemui</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {politicalData.map((poly) => (
                        <div
                            key={poly.id}
                            className="group relative bg-white/60 backdrop-blur-md rounded-3xl p-1 shadow-glass border border-white/40 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:bg-white/80"
                        >
                            {/* Card Content Wrapper */}
                            <div className="relative h-full bg-gradient-to-br from-white to-slate-50 rounded-[22px] p-6 overflow-hidden border border-slate-100 flex flex-col items-center text-center">

                                {/* Decorative Badge/Code */}
                                <div className="absolute top-4 right-4 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg z-10">
                                    {poly.code}
                                </div>

                                {/* Avatar / Photo */}
                                <div className="relative w-28 h-28 mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-kedah-gold to-kedah-green rounded-full opacity-0 group-hover:opacity-20 animate-pulse transition-opacity duration-700 blur-xl"></div>
                                    <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center relative z-10">
                                        {poly.mp_photo_url || poly.adun_photo_url ? (
                                            <img
                                                src={poly.mp_photo_url || poly.adun_photo_url}
                                                alt={poly.mp_name || poly.adun_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User size={40} className="text-slate-400" />
                                        )}
                                    </div>
                                    {/* Verification Tick */}
                                    <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-md z-20">
                                        <CheckCircle2 size={12} strokeWidth={4} />
                                    </div>
                                </div>

                                {/* Name & Title */}
                                <div className="mb-4">
                                    <h3 className="text-lg font-black text-slate-800 leading-tight mb-1 group-hover:text-kedah-green transition-colors">
                                        {politicsMode === 'parlimen' ? poly.mp_name : poly.adun_name}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                        {poly.name}
                                    </p>

                                    {/* Party Tag */}
                                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200">
                                        <Award size={12} className={
                                            (poly.mp_party || poly.adun_party)?.includes('PAS') ? 'text-green-600' :
                                                (poly.mp_party || poly.adun_party)?.includes('PH') ? 'text-red-600' : 'text-blue-600'
                                        } />
                                        <span className="text-[10px] font-black text-slate-600 uppercase">
                                            {politicsMode === 'parlimen' ? poly.mp_party : poly.adun_party}
                                        </span>
                                    </div>
                                </div>

                                {/* Footer Decoration */}
                                <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent rounded-full mt-auto"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PoliticalDashboard;
