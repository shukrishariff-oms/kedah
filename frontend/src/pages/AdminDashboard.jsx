import { useState, useEffect } from 'react'
import client from '../api/client'
import { LayoutDashboard, MapPin, Eye, FileText, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await client.get('/stats/')
                setStats(res.data)
            } catch (err) {
                console.error(err)
                setError('Gagal memuat statistik. Pastikan anda telah log masuk ke Django Admin.')
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-20 text-center">Memuatkan statistik...</div>

    if (error) return (
        <div className="p-20 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <a href="http://localhost:8000/admin/" target="_blank" className="text-kedah-green underline">
                Log masuk ke Django Admin
            </a>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center space-x-3 mb-10">
                <LayoutDashboard size={32} className="text-kedah-green" />
                <h1 className="text-3xl font-black text-slate-800 uppercase italic">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={<MapPin className="text-blue-500" />}
                    label="Jumlah Tempat"
                    val={stats.total_places}
                    sub="Semua daerah"
                />
                <StatCard
                    icon={<CheckCircle className="text-green-500" />}
                    label="Diterbitkan"
                    val={stats.published_places}
                    sub="Tersedia untuk awam"
                />
                <StatCard
                    icon={<FileText className="text-orange-500" />}
                    label="Draft"
                    val={stats.draft_places}
                    sub="Menunggu semakan"
                />
                <StatCard
                    icon={<Eye className="text-purple-500" />}
                    label="Jumlah Tontonan"
                    val={stats.total_places > 0 ? stats.most_viewed.reduce((acc, curr) => acc + curr.view_count, 0) : 0}
                    sub="Berdasarkan top 5"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">Tempat Paling Popular</h2>
                    <div className="space-y-4">
                        {stats.most_viewed.map((p, i) => (
                            <div key={p.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                                <div className="flex items-center space-x-4">
                                    <span className="text-slate-300 font-bold">#{i + 1}</span>
                                    <div>
                                        <p className="font-bold text-slate-700">{p.name}</p>
                                        <p className="text-xs text-slate-400">{p.district_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center font-bold text-kedah-green">
                                    <Eye size={14} className="mr-1" />
                                    {p.view_count}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">Ringkasan Daerah</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {stats.by_district.map(d => (
                            <div key={d.name} className="p-4 bg-slate-50 rounded-xl">
                                <p className="text-xs text-slate-400 uppercase font-bold">{d.name}</p>
                                <p className="text-2xl font-black text-slate-700">{d.place_count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 p-8 bg-kedah-green rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold mb-2">Urus Data Kedah</h3>
                    <p className="text-white/80">Gunakan portal admin Django untuk menambah, edit atau memadam data.</p>
                </div>
                <a
                    href="http://localhost:8000/admin/"
                    target="_blank"
                    className="px-8 py-3 bg-white text-kedah-green font-bold rounded-xl hover:bg-kedah-yellow hover:text-white transition-all shadow-lg"
                >
                    Buka Django Admin
                </a>
            </div>
        </div>
    )
}

function StatCard({ icon, label, val, sub }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
            <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-black text-slate-700 my-1">{val}</p>
                <p className="text-[10px] text-slate-400">{sub}</p>
            </div>
        </div>
    )
}
