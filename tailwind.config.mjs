import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta de marca — no modificar los valores DEFAULT sin actualizar el manual de marca.
        navy: {
          DEFAULT: '#0D2640',
          dark: '#081826',
          light: '#1B3A5C',
        },
        teal: {
          DEFAULT: '#00897B', // color de marca — usar para íconos, bordes, fondos grandes con texto oscuro
          dark: '#00695C',    // variante AA-segura — usar en botones sólidos con texto blanco
          light: '#26A699',
        },
        // Acento verde tomado del lado derecho del degradado real del logo
        // (antes era dorado). Se conserva el nombre de clase "gold" para no
        // romper las ~40 referencias ya escritas en el sitio.
        gold: {
          DEFAULT: '#4CAF50', // acento — bordes, íconos, fondos con texto navy. Nunca como texto sobre blanco.
          dark: '#2F8132',
          light: '#8BD98D',
        },
        mist: '#F2F7F9',
        ink: {
          DEFAULT: '#16232F',   // texto principal sobre fondos claros
          soft: '#4B5D6B',      // texto secundario sobre fondos claros
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,38,64,0.06), 0 8px 24px -8px rgba(13,38,64,0.12)',
        cardHover: '0 4px 8px rgba(13,38,64,0.08), 0 16px 32px -12px rgba(13,38,64,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [typography],
};
