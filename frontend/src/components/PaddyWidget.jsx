import { useState } from 'react';

export default function PaddyWidget({ selectedDistrict, districts = [] }) {
    // Safety check
    if (!Array.isArray(districts)) {
        districts = [];
    }

    // Find current district object to get paddy status
    const currentDistrictData = districts.find(d => d && d.slug === selectedDistrict);
    const paddyStatus = currentDistrictData?.paddy_status || 'growing';

    const getPaddyInfo = (status) => {
        switch (status) {
            case 'planting': return { label: 'Musim Menanam', icon: '🌱', color: 'bg-blue-500', desc: 'Sawah berair & pantulan cermin.' };
            case 'growing': return { label: 'Musim Membesar', icon: '🌿', color: 'bg-green-500', desc: 'Hamparan hijau saujana mata memandang.' };
            case 'harvesting': return { label: 'Musim Menuai', icon: '🌾', color: 'bg-yellow-500', desc: 'Padi menguning emas.' };
            case 'fallow': return { label: 'Musim Jerami', icon: '☀️', color: 'bg-orange-400', desc: 'Pesta jerami & aktiviti kering.' };
            default: return { label: 'Status Tidak Diketahui', icon: '📅', color: 'bg-slate-400', desc: '' };
        }
    };

    const paddyInfo = getPaddyInfo(paddyStatus);

    return (
        <div className="bg-white rounded-3xl p-5 shadow-xl border border-white/50 relative overflow-hidden group animate-fade-in">
            <div className={`absolute top-0 right-0 p-20 ${paddyInfo.color} opacity-10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`}></div>

            <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${paddyInfo.color} text-white shadow-md w-8 h-8 flex items-center justify-center`}>
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
    );
}
