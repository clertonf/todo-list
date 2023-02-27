import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TaskDTO } from '@dtos/TaskDTO';
import { Tasks } from '@components/Tasks';
import { NativeBaseProvider } from 'native-base';

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('<Tasks />', () => {
	const task: TaskDTO = {
		id: '1',
		title: 'Tarefa 1',
		description: 'Descrição da tarefa 1',
		date: '01/01/2022',
	};

	test('should correctly display task data', () => {
		const { getByText } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Tasks data={task} />
			</NativeBaseProvider>
		);
		const title = getByText(task.title);
		const description = getByText(task.description);
		const date = getByText(task.date);

		expect(title).toBeTruthy();
		expect(description).toBeTruthy();
		expect(date).toBeTruthy();
	});

	test('should call the callback function when pressed', () => {
		const onPress = jest.fn();
		const { getByTestId } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Tasks data={task} onPress={onPress} testID="tasks" />
			</NativeBaseProvider>
		);
		const taskContainer = getByTestId('tasks');

		fireEvent.press(taskContainer);

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
