import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useTheme, Box } from 'native-base';

import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
	const { colors } = useTheme();
	const { user, isLoadingUserStorageData } = useAuth();

	const theme = DefaultTheme;
	theme.colors.background = colors.gray[200];

	if (isLoadingUserStorageData) {
		return <Loading />;
	}

	return (
		<Box flex={1} bg="gray.200">
			<NavigationContainer theme={theme}>
				{user.uid ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
		</Box>
	);
}
