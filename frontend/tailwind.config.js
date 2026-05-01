/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        aurora: '#10b981',
        flare: '#f97316',
        bubblegum: '#ec4899',
        neon: '#8b5cf6',
        ink: '#cbd5e1',
      },
      boxShadow: {
        party: '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'party-grid':
          'radial-gradient(circle at 20% 20%, rgba(236,72,153,0.18), transparent 24%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.16), transparent 22%), radial-gradient(circle at 60% 70%, rgba(139,92,246,0.16), transparent 28%)',
      },
    },
  },
  plugins: [],
};
