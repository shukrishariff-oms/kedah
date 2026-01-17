import { useState, useEffect } from 'react';
import { getParliaments } from '../api/politics';

export default function PoliticsPage() {
    const [parliaments, setParliaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await getParliaments();
                console.log("API Success:", res.data);
                setParliaments(res.data || []);
            } catch (err) {
                console.error("API Error:", err);
                setError(err.message || 'Error fetching data');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Loading Politics Data...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error: {error}</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-black mb-8 text-center text-slate-800">
                INFO <span className="text-yellow-500">POLITIK</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parliaments.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={p.mp_photo_url || `https://ui-avatars.com/api/?name=${p.mp_name}`}
                                alt={p.mp_name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                            />
                            <div>
                                <span className="text-xs font-bold text-slate-400 uppercase">{p.code}</span>
                                <h3 className="text-lg font-bold text-slate-800 leading-tight">{p.name}</h3>
                                <p className="text-sm text-slate-600">{p.mp_name}</p>
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-500 mt-1 inline-block">{p.mp_party}</span>
                            </div>
                        </div>

                        {/* DUNs List */}
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                            <h4 className="text-xs font-black text-slate-400 uppercase mb-2">DUN Areas ({p.duns?.length})</h4>
                            {p.duns?.map(d => (
                                <div key={d.id} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                        <img src={d.adun_photo_url} alt={d.adun_name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-xs font-bold text-slate-700 truncate">{d.code} {d.name}</p>
                                        <p className="text-[10px] text-slate-500 truncate">{d.adun_name} ({d.adun_party})</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}
