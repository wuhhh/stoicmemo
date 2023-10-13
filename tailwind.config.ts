import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
		colors: {
			'almost-black': '#261313',
			'hot-pink': '#FF7676',
			'warm-grey': '#ACA39C',
			'warm-grey-dark': '#7C7269',
			'smoke': '#C8BFBB',
			'almost-white': '#F1F1F1',
			'nebula-indigo': '#422AA1',
			'deep-charcoal': '#131212',
			'slate-night': '#1F1C1C',
			'blush-petal': '#F3B9B9',
			'pearl': '#D9CDCD',
		},
		fontFamily: {
			sans: ['sans', 'sans-serif'],
			mono: ['mono', 'monospace']
		},
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
