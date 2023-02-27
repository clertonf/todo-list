import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NativeBaseProvider } from 'native-base';
import { useSelector } from 'react-redux';
import {
	useFonts,
	Karla_400Regular,
	Karla_700Bold,
} from '@expo-google-fonts/karla';

import { Routes } from './src/routes';

import { Loading } from '@components/Loading';
import { AuthContextProvider } from '@contexts/AuthContext';
import { persistor } from './src/store';

import { createTheme } from '@utils/Theme';

export default function App() {
	const { theme } = useSelector((state: any) => state.reducerTheme);
	const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<PersistGate persistor={persistor}>
				<NativeBaseProvider theme={createTheme(theme)}>
					<StatusBar
						barStyle="dark-content"
						backgroundColor="transparent"
						translucent
					/>
					<AuthContextProvider>
						{fontsLoaded ? <Routes /> : <Loading />}
					</AuthContextProvider>
				</NativeBaseProvider>
			</PersistGate>
		</GestureHandlerRootView>
	);
}
