import React, { createContext, ReactNode, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '@dtos/UserDTO';

export type AuthContextDataProps = {
	user: UserDTO;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps
);

const USER_COLLECTION = '@todolist:user';

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
		useState(true);
	const toast = useToast();

	async function signIn(email: string, password: string) {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(async (account) => {
				const userData = account.user;

				setUser(userData as UserDTO);

				await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
			})

			.catch((error) => {
				const { code } = error;

				if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
					return toast.show({
						title: 'E-mail e/ou senha inválida',
						placement: 'top',
						bgColor: 'red.500',
					});
				} else {
					return toast.show({
						title: 'Nao foi possível realizar o login',
						placement: 'top',
						bgColor: 'red.500',
					});
				}
			})
			.finally(() => setIsLoadingUserStorageData(false));
	}

	async function signOut() {
		try {
			setIsLoadingUserStorageData(true);
			await auth().signOut();
			await AsyncStorage.removeItem(USER_COLLECTION);
			setUser({} as UserDTO);
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	async function loadUserStorageData() {
		try {
			setIsLoadingUserStorageData(true);

			const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

			if (storedUser) {
				const userData = JSON.parse(storedUser) as UserDTO;
				setUser(userData);
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoadingUserStorageData(false);
		}
	}

	useEffect(() => {
		loadUserStorageData();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signOut,
				isLoadingUserStorageData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
