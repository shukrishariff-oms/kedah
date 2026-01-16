/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'kedah-green': '#004d40',  // Deep Emerald
                'kedah-gold': '#ffd700',   // Royal Gold
                'kedah-red': '#c62828',    // Deep Crimson
                'premium-bg': '#f8fafc',   // Soft Slate
                kedah: {
                    green: '#004A2F',
                    yellow: '#FFD700',
                    red: '#ED1C24',
                }
            },
            boxShadow: {
                'premium': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            },
            backgroundImage: {
                'premium-gradient': 'linear-gradient(135deg, #004d40 0%, #00695c 100%)',
            }
        },
    },
    plugins: [],
}
