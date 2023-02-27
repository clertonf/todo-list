import { extendTheme } from 'native-base';

export const themeDark = extendTheme({
	colors: {
		blue: {
			500: '#FF9000',
			300: '#FF9000',
		},
		green: {
			700: '#00875F',
			500: '#00B37E',
		},
		gray: {
			1000: '#a35c00',
			800: '#FF9000',
			700: '#FFFFFF',
			600: '#FFFFFF',
			500: '#FF9000',
			400: '#9F9BA1',
			300: '#30475E',
			200: '#222831',
			100: '#30475E',
		},
		white: '#FFFFFF',
		red: {
			500: '#F75A68',
			300: '#EE7979',
		},

		special_button: '#222831',

		icon: {
			100: '#FFFFFF',
			0: '#FF9000',
		},
	},
	fonts: {
		heading: 'Karla_700Bold',
		body: 'Karla_400Regular',
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24,
	},
	sizes: {
		14: 56,
		33: 148,
	},
});
