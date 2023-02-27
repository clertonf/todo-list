import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { FlatList, Text, useTheme, VStack } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

// eslint-disable-next-line
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';
import { chooseSetTask } from '../reducers/infoTask';
import { Header } from '@components/Header';
import { Tasks } from '@components/Tasks';
import { TaskDTO } from '@dtos/TaskDTO';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
	const dispatch = useDispatch();
	const theme = useTheme();
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

	function handleOpenTaskDetails(item: TaskDTO) {
		dispatch(chooseSetTask(item));
		navigation.navigate('taskDetails');
	}

	function handleNavigateForCreateNewTask() {
		navigation.navigate('createNewTask');
	}

	const positionY = useSharedValue(0);
	const positionX = useSharedValue(0);

	const newAddTaskButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: positionX.value },
				{ translateY: positionY.value },
			],
		};
	});

	const onGestureEvent = useAnimatedGestureHandler({
		onStart(_, ctx: any) {
			ctx.positionX = positionX.value;
			ctx.positionY = positionY.value;
		},
		onActive(event, ctx: any) {
			positionX.value = ctx.positionX + event.translationX;
			positionY.value = ctx.positionY + event.translationY;
		},
		onEnd() {
			positionX.value = withSpring(0);
			positionY.value = withSpring(0);
		},
	});

	return (
		<VStack flex={1}>
			<Header title="Boas Vindas!" showButtonLogout showButtonDarkMode />

			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={tasks}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<Tasks data={item} onPress={() => handleOpenTaskDetails(item)} />
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
				<PanGestureHandler onGestureEvent={onGestureEvent}>
					<Animated.View
						style={[
							newAddTaskButtonStyle,
							{
								position: 'absolute',
								bottom: 13,
								right: 22,
							},
						]}
					>
						<ButtonAnimated
							onPress={handleNavigateForCreateNewTask}
							style={[
								styles.button,
								{ backgroundColor: theme.colors.gray[500] },
							]}
						>
							<Ionicons name="add" size={32} color={theme.colors.white} />
						</ButtonAnimated>
					</Animated.View>
				</PanGestureHandler>
			</VStack>
		</VStack>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
