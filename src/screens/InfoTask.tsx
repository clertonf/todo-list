import { useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
	AlertDialog,
	Center,
	Heading,
	HStack,
	Icon,
	ScrollView,
	Skeleton,
	Text,
	Button as ButtonAlertDialog,
	useToast,
	VStack,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Feather } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import 'moment/locale/pt';

import {
	AppNavigatorRoutesProps,
	TaskNavigationProps,
} from '@routes/app.routes';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { TaskDTO } from '@dtos/TaskDTO';

const signUpSchema = yup.object({
	title: yup
		.string()
		.required('Informe o título.')
		.min(2, 'Mínimo 2 caracteres'),
	description: yup.string().required('Informe a descrição.'),
	date: yup.string().required('Informe a data.'),
});

export function InfoTask() {
	const route = useRoute();
	const { id } = route.params as TaskNavigationProps;

	const toast = useToast();

	const [isLoading, setIsLoading] = useState(false);
	const navigation = useNavigation<AppNavigatorRoutesProps>();

	const [task, setTask] = useState<TaskDTO>({} as TaskDTO);
	const [editTask, setEditTask] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef(null);

	const [open, setOpen] = useState(false);

	const dateString = '26/06/2023'; // Oct 23
	const newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
	const data = new Date(newData);

	const [newDate, setNewDate] = useState(data);

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
		firestore().collection('tasks').doc(id).delete();

		navigation.navigate('home');

		toast.show({
			title: 'Tarefa deletada com sucesso!',
			placement: 'top',
			bgColor: 'red.500',
		});
	}

	function handleUpdateCurrentTask({ title, description }: TaskDTO) {
		firestore()
			.collection('tasks')
			.doc(id)
			.update({
				title,
				description,
				date: newDate.toLocaleDateString('pt-BR'),
			})
			.then(() => {
				navigation.goBack();
				toast.show({
					title: 'Tarefa atualizado com sucesso',
					placement: 'top',
					bgColor: 'green.500',
				});
			});
	}

	useEffect(() => {
		if (id) {
			firestore()
				.collection('tasks')
				.doc(id)
				.get()
				.then((response) => {
					const currentTask = response.data() as TaskDTO;
					setTask(currentTask);
				});
		}
	}, [id]);

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
			<Header
				title="Detalhes da tarefa"
				subtitle="Logo abaixo, você verá os detalhes da tarefa. Poderá editar ou excluir 😃"
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
								isDisabled={!editTask}
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
								isDisabled={!editTask}
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
								title="Editar"
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
								bgColor="gray.700"
								_pressed={{
									bgColor: 'gray.500',
								}}
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

			<AlertDialog
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Deletar tarefa</AlertDialog.Header>
					<AlertDialog.Body>
						Deseja realmente deletar a tarefa atual?
					</AlertDialog.Body>
					<AlertDialog.Footer>
						<ButtonAlertDialog.Group space={2}>
							<ButtonAlertDialog
								variant="unstyled"
								colorScheme="coolGray"
								onPress={onClose}
								ref={cancelRef}
							>
								Cancelar
							</ButtonAlertDialog>
							<ButtonAlertDialog
								colorScheme="danger"
								onPress={handleDeleteCurrentTask}
							>
								Deletar
							</ButtonAlertDialog>
						</ButtonAlertDialog.Group>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</ScrollView>
	);
}
