import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { useEffect, useState } from 'react';
import { Tasks } from '@components/Tasks';
import { TaskDTO } from '@dtos/TaskDTO';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Center, FlatList, Text, VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore';

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';

export function Home() {
	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const [tasks, setTasks] = useState<TaskDTO[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		setIsLoading(true);
		const subscribe = firestore()
			.collection('tasks')
			.where('userUid', '==', user.uid)
			.onSnapshot((querySnapshot) => {
				const data = querySnapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				}) as TaskDTO[];
				setTasks(data);
				setIsLoading(false);
			});

		return () => subscribe();
	}, []);

	function handleOpenTaskDetails(id: string) {
		navigation.navigate('taskDetails', { id });
	}

	function handleNavigateForCreateNewTask() {
		navigation.navigate('createNewTask');
	}

	return (
		<VStack flex={1}>
			<Header title="Boas Vindas!" subtitle="😁 darkmode" showButtonLogout />

			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={tasks}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<Tasks data={item} onPress={() => handleOpenTaskDetails(item.id)} />
					)}
					_contentContainerStyle={{
						paddingBottom: 30,
					}}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={() => (
						<Text color="gray.700" textAlign="center">
							Não há tarefas cadastradas aqui
						</Text>
					)}
					mt={8}
					px={4}
				/>
			)}

			<VStack px={4} mb={10}>
				<Button
					title="Cadastrar tarefa"
					onPress={handleNavigateForCreateNewTask}
				/>
			</VStack>
		</VStack>
	);
}
