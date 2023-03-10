import { extendTheme } from 'native-base';

export const themeLight = extendTheme({
	colors: {
		blue: {
			500: '#364D9D',
			300: '#647AC7',
		},
		green: {
			700: '#00875F',
			500: '#00B37E',
		},
		gray: {
			1000: '#364D9D',
			800: '#1A182C',
			700: '#1A181B',
			600: '#3E3A40',
			500: '#5F5B62',
			400: '#9F9BA1',
			300: '#D9D8DA',
			200: '#EDECEE',
			100: '#F7F7F8',
		},
		white: '#FFFFFF',
		red: {
			500: '#F75A68',
			300: '#EE7979',
		},

		special_button: '#D9D8DA',

		icon: {
			100: '#10172A',
			0: '#FFFFFF',
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
