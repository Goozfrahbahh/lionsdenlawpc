/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/**/*.{html,ts}',
		'./src/**/**/**/*.{html,ts}',
	],
	darkMode: 'class',
	theme: {
		patterns: {
			opacities: {
				100: "1",
				80: ".80",
				60: ".60",
				40: ".40",
				20: ".20",
				10: ".10",
				5: ".05",
			},
			sizes: {
				1: "0.25rem",
				2: "0.5rem",
				4: "1rem",
				6: "1.5rem",
				8: "2rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				32: "8rem",
			}
		},
		extend: {
			colors: {
				'gray-light': '#707070',
				'gray-dark': '#171717',
				'dark-text': '#898989',
				'dark-text-light': '#b4b4b4',
				'dark-background': '#121212',
				'dark-bg-semidark': '#171717',
				'dark-bg-semilight': '#212121',
				'dark-bg-light': '#242424',
				'dark-border': '#2e2e2e',
				'dark-b-light': '#3b3b3b',
				// Brand Colors (HSL converted)
				brand: {
					'600': '#557d1e', // approximate darker shade
					'500': '#85c441', // base color
					'400': '#a1d46a', // lighter shade
					'300': '#bed990', // even lighter
					'200': '#dae8b7', // lightest shade
				},
				foreground: 'hsl(0, 0%, 9%)',
        		'foreground-contrast': 'hsl(0, 0%, 98.4%)',
        		'foreground-muted': 'hsl(0, 0%, 69.8%)',
        		'foreground-lighter': 'hsl(0, 0%, 43.9%)',
        		'foreground-light': 'hsl(0, 0%, 32.2%)',
        		'gray-light-1200': 'hsl(0, 0%, 9%)',
				'background-selection':'hsl(0, 0%, 92.9%)',
				'background-control': 'hsl(0, 0%, 95.3%)'
			},
			minHeight: {
				"screen-75": "75vh",
			},
			fontSize: {
				55: "55rem",
			},
			opacity: {
				80: ".8",
			},
			zIndex: {
				2: 2,
				3: 3,
			},
			inset: {
				"-100": "-100%",
				"-225-px": "-225px",
				"-160-px": "-160px",
				"-150-px": "-150px",
				"-94-px": "-94px",
				"-50-px": "-50px",
				"-29-px": "-29px",
				"-20-px": "-20px",
				"25-px": "25px",
				"40-px": "40px",
				"95-px": "95px",
				"145-px": "145px",
				"195-px": "195px",
				"210-px": "210px",
				"260-px": "260px",
			},
			height: {
				"95-px": "95px",
				"70-px": "70px",
				"350-px": "350px",
				"500-px": "500px",
				"600-px": "600px",
			},
			maxHeight: {
				"860-px": "860px",
			},
			maxWidth: {
				"100-px": "100px",
				"120-px": "120px",
				"150-px": "150px",
				"180-px": "180px",
				"200-px": "200px",
				"210-px": "210px",
				"580-px": "580px",
			},
			minWidth: {
				"140-px": "140px",
				48: "12rem",
			},
			backgroundSize: {
				full: "100%",
			},
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
				}
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.5s ease-out'
			},
			keyframes: {
				'in-out-ease': {
					'0%': {
						width: '100%',
					},
					'100%': {
						width: 0,
						position: 'absolute'
					},
				}
			},
			animation: {
				'in-out-ease': 'fade-in-down 2s cubic-bezier( 0.455, 0.03, 0.515, 0.955 )'
			},
		},
	},
	plugins: [require('@tailwindcss/typography')]
}
