/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A0F24',
          900: '#101936',
          800: '#18244D',
          700: '#23346B',
        },
        brand: {
          50: '#EEF0FF',
          100: '#E0E3FF',
          200: '#C7CBFF',
          300: '#A4ABFE',
          400: '#7F86FD',
          500: '#635BFF',
          600: '#4F43F3',
          700: '#4132DE',
          800: '#3429B4',
          900: '#2E278E',
        },
        purple: {
          soft: '#8B7CF6',
        },
        growth: {
          green: '#22C55E',
          emerald: '#10B981',
          teal: '#0D9488',
        },
        surface: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E5E7EB',
          subtle: '#F1F5F9',
        },
        txt: {
          primary: '#111827',
          secondary: '#64748B',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(16, 25, 54, 0.06), 0 2px 6px -1px rgba(16, 25, 54, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(16, 25, 54, 0.12), 0 4px 10px -2px rgba(16, 25, 54, 0.06)',
        'glow': '0 0 25px -5px rgba(99, 91, 255, 0.25)',
      }
    },
  },
  plugins: [],
};
