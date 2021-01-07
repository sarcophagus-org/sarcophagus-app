module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    colors: {
      gray: {
        400: '#888293',
        500: '#29262F',
        900: '#060706',
      },
      green: '#4ECE3D',
      red: '#CA3737',
      white: '#ffffff',
      yellow: '#FACA00',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto Mono'],
      },
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '0.625rem',
        sm: '0.8125rem',
      },
    },
  },
  variants: {},
  plugins: [],
}