import { createContext, ReactNode, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserDTO } from '@dtos/UserDTO';
import { useToast } from 'native-base';

export type AuthContextDataProps = {
	signIn: (email: string, password: string) => Promise<void>;
	// signOut: () => Promise<void>;
	isLoadingUserStorageData: boolean;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
		useState(true);
	const toast = useToast();

	async function signIn(email: string, password: string) {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then((account) => {
				firestore()
					.collection('users')
					.doc(account.user.uid)
					.get()
					.then(async (profile) => {
						const { name, tasks } = profile.data() as UserDTO;

						if (profile.exists) {
							const userData = {
								id: account.user.uid,
								name,
								tasks,
							};

							// await AsyncStorage.setItem(
							// 	USER_COLLECTION,
							// 	JSON.stringify(userData)
							// );
							setUser(userData);

							toast.show({
								title: 'Login realizado com sucesso',
								placement: 'top',
								bgColor: 'green.700',
							});
						}
					})
					.catch(() => {
						const title =
							'Nao foi possível buscar os dados de perfil desse usuário';
						toast.show({
							title,
							placement: 'top',
							bgColor: 'red.500',
						});
					});
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

	// async function signOut() {}

	return (
		<AuthContext.Provider
			value={{
				signIn,
				// signOut,
				isLoadingUserStorageData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
