import React, { useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
	Center,
	Heading,
	HStack,
	Icon,
	ScrollView,
	useToast,
	VStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { TaskDTO } from '@dtos/TaskDTO';
import { ModalAlert } from '@components/ModalAlert';

import moment from 'moment';
import 'moment/locale/pt';

const signUpSchema = yup.object({
	title: yup
		.string()
		.required('Informe o título.')
		.min(2, 'Mínimo 2 caracteres'),
	description: yup.string().required('Informe a descrição.'),
	date: yup.string().required('Informe a data.'),
});

export function InfoTask() {
	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation<AppNavigatorRoutesProps>();

	const [task, setTask] = useState<TaskDTO>({} as TaskDTO);
	const [editTask, setEditTask] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef(null);

	const [open, setOpen] = useState(false);

	const currentTask: TaskDTO = useSelector(
		(state: any) => state.reducerInfoTask.infoTask
	);

	const dateString = currentTask.date;
	const newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
	const data = new Date(newData);

	const [newDate, setNewDate] = useState(data);

	useEffect(() => {
		setTask(currentTask);
	}, []);

	const {
		control,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<TaskDTO>({
		resolver: yupResolver(signUpSchema),
	});

	function handleGoBack() {
		navigation.goBack();
	}

	function handleDeleteCurrentTask() {
		firestore().collection('tasks').doc(currentTask.id).delete();

		navigation.navigate('home');

		toast.show({
			title: 'Tarefa deletada com sucesso!',
			placement: 'top',
			bgColor: 'red.500',
		});
	}

	function handleUpdateCurrentTask({ title, description }: TaskDTO) {
		setIsLoading(true);
		firestore()
			.collection('tasks')
			.doc(currentTask.id)
			.update({
				title,
				description,
				date: moment(newDate).format('DD/MM/YYYY'),
			})
			.then(() => {
				navigation.goBack();
				setIsLoading(false);
				toast.show({
					title: 'Tarefa atualizado com sucesso',
					placement: 'top',
					bgColor: 'green.500',
				});
			})
			.catch((error) => {
				setIsLoading(false);
				return toast.show({
					title: 'Não foi possível atualizar a tarefa',
					placement: 'top',
					bgColor: 'red.500',
				});
			});
	}

	function handleUndoChanges() {
		if (task === undefined) {
			return;
		}

		reset({
			...getValues(),
			title: task.title,
			description: task.description,
			date: task.date,
		});
	}

	useEffect(() => {
		handleUndoChanges();
	}, [reset, task, getValues]);

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			backgroundColor="gray.200"
			showsVerticalScrollIndicator={false}
		>
			<Header title="Detalhes da tarefa" showButtonLogout />
			<VStack flex={1} mt={6} px={4}>
				<Center>
					<Heading
						color="gray.600"
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
								isDisabled={!editTask}
							/>
						)}
					/>
					<Heading
						color="gray.600"
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
								isDisabled={!editTask}
							/>
						)}
					/>

					<Heading
						color="gray.600"
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
						value={moment(newDate).format('DD/MM/YYYY')}
						onPressIn={() => setOpen(editTask)}
						InputRightElement={
							<Icon
								as={<Feather name="calendar" />}
								size={4}
								mr="3"
								color="blue.300"
							/>
						}
						isDisabled={!editTask}
					/>
				</Center>

				<VStack flex={1} justifyContent="flex-end" mb="20">
					{editTask ? (
						<>
							<Button
								title="Atualizar"
								onPress={handleSubmit(handleUpdateCurrentTask)}
								mb={4}
								isLoading={isLoading}
								rightIcon={
									<Icon
										as={<Feather name="edit" />}
										size={4}
										mr="3"
										color="white"
									/>
								}
							/>

							<Button
								title="Cancelar"
								variant="outline"
								onPress={() => {
									setEditTask(false);
									handleUndoChanges();
								}}
							/>
						</>
					) : (
						<>
							<HStack justifyContent="space-between">
								<Button
									w="48%"
									title="Editar"
									onPress={() => {
										setEditTask(true);
									}}
									mb={4}
									isLoading={isLoading}
									rightIcon={
										<Icon
											as={<Feather name="edit" />}
											size={4}
											mr="3"
											color="white"
										/>
									}
								/>

								<Button
									w="48%"
									title="Excluir"
									onPress={() => setIsOpen(!isOpen)}
									mb={4}
									bgColor="red.500"
									_pressed={{
										bgColor: 'red.300',
									}}
									isLoading={isLoading}
									rightIcon={
										<Icon
											as={<Feather name="trash" />}
											size={4}
											mr="3"
											color="white"
										/>
									}
								/>
							</HStack>

							<Button title="Voltar" variant="outline" onPress={handleGoBack} />
						</>
					)}
				</VStack>
			</VStack>

			<ModalAlert
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				onClose={onClose}
				onPress={handleDeleteCurrentTask}
				title="Deletar tarefa"
				subtitle="Deseja realmente deletar a tarefa atual?"
				alertTitleButton="Sair"
			/>
		</ScrollView>
	);
}
