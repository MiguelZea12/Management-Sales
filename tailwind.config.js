/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/**/*.html'], // Rutas de los archivos HTML o plantillas que Tailwind CSS debe analizar
  theme: {
    extend: {
      colors: {
        // Definición de colores personalizados
        skyblue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [
    // Agrega plugins personalizados aquí si los necesitas
    // Ejemplo: require('@tailwindcss/typography'),
  ],
}

