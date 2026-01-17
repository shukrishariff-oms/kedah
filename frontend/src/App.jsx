import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PlaceDetail from './pages/PlaceDetail'
import AdminDashboard from './pages/AdminDashboard'
import PoliticsPage from './pages/PoliticsPage'
import TourismPage from './pages/TourismPage'
import FoodPage from './pages/FoodPage'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50">
                <nav className="bg-premium-gradient text-white py-5 shadow-glass sticky top-0 z-50 border-b border-white/10">
                    <div className="container mx-auto px-6 flex justify-between items-center">
                        <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => window.location.href = '/'}>
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-kedah-green text-2xl shadow-premium transform transition group-hover:scale-105">
                                IK
                            </div>
                            <div className="leading-tight">
                                <h1 className="text-2xl font-black uppercase tracking-tighter">
                                    Info <span className="text-kedah-gold">Kedah</span>
                                </h1>
                                <p className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold">Powered by Ohmaishoot!</p>
                            </div>
                        </div>
                        <ul className="hidden md:flex space-x-6 text-[10px] font-bold uppercase tracking-widest">
                            <li><a href="/" className="hover:text-kedah-gold transition-colors duration-300">Utama</a></li>
                            <li><a href="/food" className="hover:text-kedah-gold transition-colors duration-300">Makan</a></li>
                            <li><a href="/hidden-gems" className="hover:text-kedah-gold transition-colors duration-300">Hidden Gems</a></li>
                            <li><a href="/history" className="hover:text-kedah-gold transition-colors duration-300">Sejarah</a></li>
                            <li><a href="/politics" className="hover:text-kedah-gold transition-colors duration-300">Politik</a></li>
                            <li><a href="/admin" className="px-5 py-2.5 bg-kedah-gold text-kedah-green rounded-full shadow-premium hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95">Dashboard</a></li>
                        </ul>
                    </div>
                </nav>

                <main className="min-h-[calc(100vh-160px)]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/politics" element={<PoliticsPage />} />
                        <Route path="/food" element={<FoodPage />} />
                        <Route path="/hidden-gems" element={<TourismPage title="Permata Tersembunyi" category="Hidden Gem" description="Lokasi rahsia yang menakjubkan." />} />
                        <Route path="/history" element={<TourismPage title="Jejak Sejarah" category="History" description="Kenali warisan dan sejarah Kedah Tua." />} />
                        <Route path="/place/:slug" element={<PlaceDetail />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>

                <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                            <div className="text-center md:text-left">
                                <p className="text-white font-black text-2xl tracking-tighter mb-2 uppercase">INFO <span className="text-kedah-gold">KEDAH</span></p>
                                <p className="text-sm max-w-sm leading-relaxed opacity-60">
                                    Platform digital rasmi untuk meneroka keunikan kuliner dan tempat-tempat menarik di negeri Kedah Darul Aman.
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-kedah-green transition cursor-pointer">
                                    <span className="text-white text-xs font-bold">FB</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-kedah-green transition cursor-pointer">
                                    <span className="text-white text-xs font-bold">IG</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-kedah-green transition cursor-pointer">
                                    <span className="text-white text-xs font-bold">YT</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest gap-4">
                            <p>&copy; 2026 Hak Cipta Terpelihara. Kedah Digital Initiatives.</p>
                            <div className="flex space-x-6">
                                <a href="#" className="hover:text-kedah-gold transition">Privacy Policy</a>
                                <a href="#" className="hover:text-kedah-gold transition">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Router>
    )
}

export default App
