import { useState } from 'react';
import {
	Center,
	Heading,
	ScrollView,
	Skeleton,
	Text,
	useToast,
	VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

import { useAuth } from '@hooks/useAuth';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

type FormDataProps = {
	email: string;
	password: string;
	password_confirm: string;
};

const signUpSchema = yup.object({
	email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
	password: yup
		.string()
		.required('Informe a senha.')
		.min(6, 'A senha deve ter pelo menos 6 digitos.'),
	password_confirm: yup
		.string()
		.required('Confirme a senha.')
		.oneOf(
			[yup.ref('password'), null as any],
			'A confirmação da senha não confere'
		),
});

export function SignUp() {
	const { signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation<AuthNavigatorRoutesProps>();
	const toast = useToast();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema),
	});

	function handleGoBack() {
		navigation.navigate('signIn');
	}

	function handleCreateUserAccount({ email, password }: FormDataProps) {
		setIsLoading(true);
		auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				signIn(email, password);
				setIsLoading(false);
				return toast.show({
					title: 'Usuário criado com sucesso',
					placement: 'top',
					bgColor: 'green.700',
				});
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					setIsLoading(false);
					return toast.show({
						title: 'E-mail já está sendo usado',
						placement: 'top',
						bgColor: 'red.500',
					});
				}

				if (error.code === 'auth/invalid-email') {
					setIsLoading(false);
					return toast.show({
						title: 'E-mail inválido',
						placement: 'top',
						bgColor: 'red.500',
					});
				}
			});
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			backgroundColor="gray.200"
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} mt={6} px={9}>
				<Center my={10}>
					<Heading color="gray.700" mt={4} fontSize="lg" fontFamily="heading">
						Boas vindas!
					</Heading>
					<Text color="gray.500" mt={3} fontSize="md" textAlign="center">
						Crie sua conta e use o espaço para {'\n'}
						organizar suas tarefas
					</Text>
				</Center>

				<Center>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
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
								placeholder="Senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password_confirm"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Confirmar a senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								errorMessage={errors.password_confirm?.message}
							/>
						)}
					/>
					<Button
						title="Criar"
						mt={2}
						bgColor="gray.800"
						onPress={handleSubmit(handleCreateUserAccount)}
						_pressed={{
							bgColor: 'gray.500',
						}}
						isLoading={isLoading}
					/>
				</Center>

				<Center flex={1} justifyContent="flex-end" mb="20">
					<Text mt={10} color="gray.700" fontSize="sm" mb={4} fontFamily="body">
						Já tem uma conta?
					</Text>

					<Button
						title="Ir para o login"
						variant="outline"
						onPress={handleGoBack}
					/>
				</Center>
			</VStack>
		</ScrollView>
	);
}
