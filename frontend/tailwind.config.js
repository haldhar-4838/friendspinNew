/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050816',
        dusk: '#0f172a',
        aurora: '#10b981',
        flare: '#f97316',
        bubblegum: '#ec4899',
        neon: '#8b5cf6',
        ink: '#cbd5e1',
      },
      boxShadow: {
        party: '0 25px 50px -12px rgba(236, 72, 153, 0.25)',
        glass: '0 24px 70px -28px rgba(15, 23, 42, 0.8)',
        'glow-pink': '0 0 0 1px rgba(236,72,153,0.14), 0 24px 65px -28px rgba(236,72,153,0.55)',
        'glow-green': '0 0 0 1px rgba(16,185,129,0.18), 0 24px 65px -30px rgba(16,185,129,0.45)',
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
      },
      backgroundImage: {
        'party-grid':
          'radial-gradient(circle at 20% 20%, rgba(236,72,153,0.18), transparent 24%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.16), transparent 22%), radial-gradient(circle at 60% 70%, rgba(139,92,246,0.16), transparent 28%)',
        'party-hero':
          'radial-gradient(circle at top, rgba(236,72,153,0.2), transparent 30%), radial-gradient(circle at 0% 100%, rgba(16,185,129,0.14), transparent 36%), linear-gradient(180deg, rgba(15,23,42,0.92) 0%, rgba(5,8,22,0.98) 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.035)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        'pulse-soft': 'pulse-soft 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
