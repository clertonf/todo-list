import React, { useState } from 'react';
import {
	Center,
	Heading,
	Icon,
	ScrollView,
	useToast,
	VStack,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import { Feather } from '@expo/vector-icons';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { TaskDTO } from '@dtos/TaskDTO';
import { useAuth } from '@hooks/useAuth';

const signUpSchema = yup.object({
	title: yup
		.string()
		.required('Informe o título.')
		.min(2, 'Mínimo 2 caracteres'),
	description: yup.string().required('Informe a descrição.'),
});

export function CreateTask() {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const toast = useToast();

	const [newDate, setNewDate] = useState(new Date());
	const [open, setOpen] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskDTO>({
		resolver: yupResolver(signUpSchema),
	});

	function handleGoBack() {
		navigation.goBack();
	}

	function handleCreateNewTask({ title, description }: TaskDTO) {
		setIsLoading(true);
		firestore()
			.collection('tasks')
			.add({
				title,
				description,
				date: newDate.toLocaleDateString('pt-BR'),
				userUid: user.uid,
			})
			.then(() => {
				navigation.goBack();
				return toast.show({
					title: 'Tarefa adicionada com sucesso',
					placement: 'top',
					bgColor: 'green.500',
				});
			})
			.catch((error) => {
				return toast.show({
					title: 'Não foi possível registrar uma nova tarefa',
					placement: 'top',
					bgColor: 'red.500',
				});
			});
		setIsLoading(false);
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			backgroundColor="gray.200"
			showsVerticalScrollIndicator={false}
		>
			<Header
				title="Registrar tarefa"
				subtitle="Informe os campos abaixo para cadastrar uma nova tarefa"
			/>
			<VStack flex={1} mt={6} px={4}>
				<Center>
					<Heading
						color="gray.500"
						fontSize="lg"
						mb={2}
						alignSelf="flex-start"
						fontFamily="heading"
					>
						Título:
					</Heading>

					<Controller
						control={control}
						name="title"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Informe o título da tarefa"
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={onChange}
								value={value}
								errorMessage={errors.title?.message}
							/>
						)}
					/>
					<Heading
						color="gray.500"
						fontSize="lg"
						mb={2}
						alignSelf="flex-start"
						fontFamily="heading"
					>
						Descrição:
					</Heading>

					<Controller
						control={control}
						name="description"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Informe a descrição..."
								multiline
								h={24}
								onChangeText={onChange}
								value={value}
								autoCorrect={false}
								errorMessage={errors.description?.message}
							/>
						)}
					/>

					<Heading
						color="gray.500"
						fontSize="lg"
						mb={2}
						alignSelf="flex-start"
						fontFamily="heading"
					>
						Data:
					</Heading>

					<DatePicker
						modal
						open={open}
						date={newDate}
						onConfirm={(date) => {
							setOpen(false);
							setNewDate(date);
						}}
						onCancel={() => {
							setOpen(false);
						}}
						locale="pt-BR"
						mode="date"
					/>

					<Input
						placeholder="Data"
						value={String(newDate.toLocaleDateString('pt-BR'))}
						onPressIn={() => setOpen(true)}
						InputRightElement={
							<Icon
								as={<Feather name="calendar" />}
								size={4}
								mr="3"
								color="blue.300"
							/>
						}
					/>
				</Center>

				<Center flex={1} justifyContent="flex-end" mb="20">
					<Button
						title="Registrar nova tarefa"
						onPress={handleSubmit(handleCreateNewTask)}
						mb={4}
						isLoading={isLoading}
					/>

					<Button title="Cancelar" variant="outline" onPress={handleGoBack} />
				</Center>
			</VStack>
		</ScrollView>
	);
}
