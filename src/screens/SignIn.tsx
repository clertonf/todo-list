import { Center, Heading, ScrollView, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';
import { DarkMode } from '@components/DarkMode';

type FormDataProps = {
	email: string;
	password: string;
};

const signInSchema = yup.object({
	email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha.')
		.min(6, 'A senha deve ter pelo menos 6 digitos.'),
});

export function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation<AuthNavigatorRoutesProps>();
	const { signIn } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signInSchema),
	});

	function handleNewAccount() {
		navigation.navigate('signUp');
	}

	async function handleSignIn({ email, password }: FormDataProps) {
		setIsLoading(true);
		await signIn(email, password);
		setIsLoading(false);
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			backgroundColor="gray.100"
			showsVerticalScrollIndicator={false}
			testID="signInScreen"
		>
			<VStack
				flex={1}
				px={10}
				bgColor="gray.200"
				borderBottomLeftRadius={24}
				borderBottomRightRadius={24}
			>
				<Center my={24}>
					<DarkMode mb={2} />
					<Heading color="gray.700" fontSize="4xl" fontFamily="heading">
						to-do list
					</Heading>
					<Text color="gray.500" fontSize="md">
						Organize melhor suas tarefas
					</Text>
				</Center>

				<Center>
					<Heading color="gray.700" fontSize="sm" mb={6} fontFamily="body">
						Acesse sua conta
					</Heading>

					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
								testID="email-input"
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={onChange}
								value={value}
								errorMessage={errors.email?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, value } }) => (
							<Input
								testID="password-input"
								placeholder="Senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password?.message}
							/>
						)}
					/>
					<Button
						title="Acessar"
						testID="submit-button"
						onPress={handleSubmit(handleSignIn)}
						isLoading={isLoading}
					/>
				</Center>
			</VStack>

			<Center px={10} flex={1} justifyContent="flex-end" mb="20">
				<Text color="gray.700" fontSize="sm" mb={4} fontFamily="body">
					Ainda não tem acesso?
				</Text>

				<Button
					title="Criar conta"
					variant="outline"
					onPress={handleNewAccount}
					bgColor="special_button"
				/>
			</Center>
		</ScrollView>
	);
}
