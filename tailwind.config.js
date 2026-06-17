/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        background: '#0F172A',
        surface: '#111827',
        text: '#F8FAFC',
        muted: '#94A3B8',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'premium-glow': '0 0 20px 0 rgba(99, 102, 241, 0.15)',
        'premium-glow-hover': '0 0 30px 2px rgba(139, 92, 246, 0.25)',
      }
    },
  },
  plugins: [],
}
