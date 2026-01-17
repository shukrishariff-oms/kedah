import { useState, useEffect } from 'react'
import { getDistricts } from '../api/districts'
import { getParliaments, getDUNs } from '../api/politics'
import Map from '../components/Map'
import PoliticalDashboard from '../components/PoliticalDashboard'
import RepresentativeDetail from '../components/RepresentativeDetail'
import { Map as MapIcon } from 'lucide-react'

export default function PoliticsPage() {
    const [districts, setDistricts] = useState([])
    const [politicalData, setPoliticalData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [politicsMode, setPoliticsMode] = useState('parlimen') // 'parlimen' or 'dun'

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                // Fetch Districts
                const dRes = await getDistricts();
                setDistricts(dRes.data || []);

                // Fetch Political Data based on mode
                let pData = [];
                if (politicsMode === 'parlimen') {
                    const res = await getParliaments();
                    pData = res.data || [];
                } else {
                    const res = await getDUNs();
                    pData = res.data || [];
                }
                setPoliticalData(pData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [politicsMode]); // Re-fetch when mode changes

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            {/* Header */}
            <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-4xl font-black text-kedah-green mb-2 leading-tight uppercase tracking-tighter">
                        Info <span className="text-kedah-gold">Politik</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl leading-relaxed">
                        Kenali Ahli Parlimen dan ADUN kawasan anda.
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
                    <button
                        onClick={() => setPoliticsMode('parlimen')}
                        className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${politicsMode === 'parlimen'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-transparent text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        Parlimen
                    </button>
                    <button
                        onClick={() => setPoliticsMode('dun')}
                        className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${politicsMode === 'dun'
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-transparent text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        DUN
                    </button>
                </div>
            </div>

            {/* Main Content (Split View) */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[500px]">
                    {/* Left Column: Detailed View */}
                    <div className="lg:col-span-4 h-full relative z-10">
                        <RepresentativeDetail
                            selectedDistrict={selectedDistrict}
                            districts={districts}
                            politicalData={politicalData}
                            politicsMode={politicsMode}
                        />
                    </div>

                    {/* Right Column: Map */}
                    <div className="lg:col-span-8 h-full bg-slate-50/50 rounded-[3rem] p-4 lg:p-0">
                        <Map
                            markers={[]} // No tourism markers here
                            politicalData={politicalData}
                            politicsMode={politicsMode}
                            districts={districts}
                            interactive={true}
                            onDistrictSelect={setSelectedDistrict}
                            lockView={true}
                            className="h-full w-full"
                        />
                    </div>
                </div>

                {/* Bottom Carousel */}
                <PoliticalDashboard
                    politicalData={politicalData}
                    politicsMode={politicsMode}
                    selectedDistrict={selectedDistrict}
                    districts={districts}
                    onSelectDistrict={setSelectedDistrict}
                />
            </div>
        </div>
    )
}
