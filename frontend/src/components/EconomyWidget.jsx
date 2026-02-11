import { useState, useEffect } from 'react';
import { getEconomyStats } from '../api/economy';
import { TrendingUp, Users, Wallet, Loader2 } from 'lucide-react';

export default function EconomyWidget() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await getEconomyStats();
                setStats(res.data);
            } catch (err) {
                console.error('Failed to fetch economy stats:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100 flex flex-col items-center justify-center min-h-[300px] space-y-4">
                <Loader2 className="animate-spin text-kedah-green" size={40} />
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] animate-pulse">Menghubungi OpenDOSM...</p>
            </div>
        );
    }

    if (!stats) return null;

    // Helper to format values
    const gdpValue = stats.gdp ? (stats.gdp.value / 1000).toFixed(1) : 'N/A';
    const populationValue = stats.population ? (stats.population.population / 1000).toFixed(2) : 'N/A'; // OpenDOSM population is usually in '000
    const incomeValue = stats.hies ? stats.hies.income_mean.toLocaleString() : 'N/A';

    return (
        <div className="bg-white rounded-[2rem] p-10 shadow-premium border border-slate-100 relative overflow-hidden group animate-fade-in-up">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 p-32 bg-kedah-green opacity-5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-1000"></div>
            <div className="absolute bottom-0 left-0 p-32 bg-kedah-yellow opacity-5 rounded-full blur-3xl -ml-16 -mb-16 group-hover:opacity-10 transition-opacity duration-1000"></div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="w-8 h-[2px] bg-kedah-green"></span>
                            <span className="text-xs font-black text-kedah-green uppercase tracking-[0.3em]">Live Data Feed</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tighter leading-none">
                            Ekonomi <span className="text-kedah-green">Kedah</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-2">Statistik prestasi negeri secara masa nyata dari OpenDOSM.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden md:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kemas kini Terakhir</p>
                            <p className="text-xs font-bold text-slate-800">{stats.gdp?.date || '2024'}</p>
                        </div>
                        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <TrendingUp size={28} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <StatItem
                        label="KDNK (GDP)"
                        value={`${gdpValue}B`}
                        unit="RM"
                        icon={<TrendingUp size={20} />}
                        color="text-blue-600"
                        bg="bg-blue-50"
                        border="border-blue-100"
                        desc="Nilai tambah kasar (Harga Malar)."
                    />
                    <StatItem
                        label="Penduduk"
                        value={`${populationValue}J`}
                        unit="Juta"
                        icon={<Users size={20} />}
                        color="text-teal-600"
                        bg="bg-teal-50"
                        border="border-teal-100"
                        desc="Anggaran penduduk pertengahan tahun."
                    />
                    <StatItem
                        label="Pendapatan"
                        value={`RM${incomeValue}`}
                        unit="Purata"
                        icon={<Wallet size={20} />}
                        color="text-orange-600"
                        bg="bg-orange-50"
                        border="border-orange-100"
                        desc="Purata pendapatan bulanan isi rumah."
                    />
                </div>

                <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                            ))}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dipercayai oleh penganalisis data</p>
                    </div>
                    <button className="text-xs font-black text-kedah-green uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                        Lihat Laporan Penuh
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatItem({ label, value, unit, icon, color, bg, border, desc }) {
    return (
        <div className="group/item">
            <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2.5 rounded-xl ${bg} ${color} border ${border} shadow-sm group-hover/item:scale-110 transition-transform`}>
                    {icon}
                </div>
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter group-hover/item:text-kedah-green transition-colors">{value}</span>
                    <span className="text-sm font-black text-slate-400 uppercase tracking-tighter">{unit}</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px]">{desc}</p>
            </div>
        </div>
    );
}
