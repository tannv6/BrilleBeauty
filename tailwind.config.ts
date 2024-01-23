import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        f04b76: '#f04b76',
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
      },
      width: {
        '615': '615px',
      },
      fontFamily: {
        'Arial': ['Arial', 'sans-serif'],
      },
      container: {
        center: true,
        screens: {
          '2xl': '1200px',
        },
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
      borderColor: {
        DEFAULT: '#dbdbdb',
        },
    },
  },
  plugins: [],
}
export default config
