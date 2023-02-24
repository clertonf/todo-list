import { Loading } from '@components/Loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme, Box } from 'native-base';
import { AppRoutes } from './app.routes';

import { AuthRoutes } from './auth.routes';

export function Routes() {
	const { colors } = useTheme();

	const theme = DefaultTheme;
	theme.colors.background = colors.gray[200];

	return (
		<Box flex={1} bg="gray.200">
			<NavigationContainer theme={theme}>
				<AuthRoutes />
			</NavigationContainer>
		</Box>
	);
}
