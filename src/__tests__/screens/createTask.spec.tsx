import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { CreateTask } from '@screens/CreateTask';

jest.mock('@react-native-async-storage/async-storage', () => ({
	setItem: jest.fn(() => Promise.resolve()),
	getItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn(),
}));

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('screen CreateTask', () => {
	it('renders correct title button', () => {
		render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<CreateTask />
			</NativeBaseProvider>
		);

		expect(screen.getByText('Registrar nova tarefa')).toBeTruthy();
	});

	it('check if show correctly user input name placeholder', () => {
		const { getByPlaceholderText } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<CreateTask />
			</NativeBaseProvider>
		);

		const inputName = getByPlaceholderText('Informe a descrição...');

		expect(inputName.props.placeholder).toBeTruthy();
	});
});
