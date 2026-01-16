// import { Sprout, Wheat, Droplets, Sun, Calendar } from 'lucide-react';

export default function ExperienceControls({
    selectedExperience,
    setSelectedExperience,
    selectedDistrict,
    districts = [],
    politicsMode,
    setPoliticsMode
}) {
    const EXPERIENCES = [
        // { id: 'Semua', label: 'Terokai Semua', icon: '✨', color: 'bg-slate-800' },
        { id: 'Food', label: 'Jalan-Jalan Cari Makan', icon: '🍜', color: 'bg-orange-500' },
        { id: 'Hidden Gem', label: 'Hidden Gems', icon: '💎', color: 'bg-teal-500' },
        { id: 'History', label: 'Jejak Sejarah', icon: '🏛️', color: 'bg-amber-700' },
        { id: 'Politik', label: 'Info Politik (YB)', icon: '🏛️', color: 'bg-purple-600' },
    ];

    // Safety check
    if (!Array.isArray(districts)) {
        console.error("ExperienceControls: districts is not an array", districts);
        // Fallback to empty
        districts = [];
    }

    // Find current district object to get paddy status
    const currentDistrictData = districts.find(d => d && d.slug === selectedDistrict);
    const paddyStatus = currentDistrictData?.paddy_status || 'growing';

    const getPaddyInfo = (status) => {
        // Icons replaced with text for debugging
        switch (status) {
            case 'planting': return { label: 'Musim Menanam', icon: <span>🌱</span>, color: 'bg-blue-500', desc: 'Sawah berair & pantulan cermin.' };
            case 'growing': return { label: 'Musim Membesar', icon: <span>🌿</span>, color: 'bg-green-500', desc: 'Hamparan hijau saujana mata memandang.' };
            case 'harvesting': return { label: 'Musim Menuai', icon: <span>🌾</span>, color: 'bg-yellow-500', desc: 'Padi menguning emas.' };
            case 'fallow': return { label: 'Musim Jerami', icon: <span>☀️</span>, color: 'bg-orange-400', desc: 'Pesta jerami & aktiviti kering.' };
            default: return { label: 'Status Tidak Diketahui', icon: <span>📅</span>, color: 'bg-slate-400', desc: '' };
        }
    };

    const paddyInfo = getPaddyInfo(paddyStatus);

    return (
        <div className="space-y-6">
            {/* Experience Toggles */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setSelectedExperience('Semua')}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedExperience === 'Semua'
                            ? 'bg-slate-800 text-white shadow-lg scale-105'
                            : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                            }`}
                    >
                        ✨ Semua
                    </button>
                    {EXPERIENCES.map(exp => (
                        <button
                            key={exp.id}
                            onClick={() => setSelectedExperience(exp.id)}
                            className={`px-4 py-2 rounded-xl flex items-center space-x-2 text-xs font-black uppercase tracking-widest transition-all ${selectedExperience === exp.id
                                ? `${exp.color} text-white shadow-lg scale-105 ring-2 ring-offset-2 ring-${exp.color.split('-')[1]}-200`
                                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                                }`}
                        >
                            <span>{exp.icon}</span>
                            <span>{exp.label}</span>
                        </button>
                    ))}
                </div>

                {/* Sub-controls for Politics */}
                {selectedExperience === 'Politik' && (
                    <div className="flex gap-2 animate-fade-in">
                        <button
                            onClick={() => setPoliticsMode('parlimen')}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${politicsMode === 'parlimen'
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                : 'bg-white text-slate-400 border-slate-200 hover:border-purple-300'
                                }`}
                        >
                            Parlimen
                        </button>
                        <button
                            onClick={() => setPoliticsMode('dun')}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${politicsMode === 'dun'
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                : 'bg-white text-slate-400 border-slate-200 hover:border-purple-300'
                                }`}
                        >
                            DUN
                        </button>
                    </div>
                )}
            </div>

            {/* Paddy Season Widget (Only show if ALL or relevant mode) */}
            {selectedExperience !== 'Politik' && (
                <div className="bg-white rounded-3xl p-5 shadow-xl border border-white/50 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 p-20 ${paddyInfo.color} opacity-10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`}></div>

                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-lg ${paddyInfo.color} text-white shadow-md`}>
                                {paddyInfo.icon}
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                    {selectedDistrict ? `Musim Padi: ${currentDistrictData?.name}` : 'Musim Padi Kedah (Umum)'}
                                </h4>
                                <p className="text-slate-800 font-bold leading-none mt-1">{paddyInfo.label}</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 relative z-10 pl-1">
                        {paddyInfo.desc}
                    </p>
                </div>
            )}
        </div>
    );
}
