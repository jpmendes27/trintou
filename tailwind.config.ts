import type { Config } from 'tailwindcss';

// O visual mora quase todo no globals.css e nos estilos inline dos
// componentes, que reproduzem o mockup valor por valor. O Tailwind aqui
// serve pro reset, pro sr-only e pras poucas utilidades usadas.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        marrom: '#6f5945',
        dourado: '#c6a06a',
        apoio: '#a08f7a',
        rotulo: '#b39a72',
      },
    },
  },
  plugins: [],
};

export default config;
