import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';

import { Button } from '@components/Button';

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Button component', () => {
	test('renders correctly', () => {
		const { getByText } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Button title="Teste" />
			</NativeBaseProvider>
		);
		const buttonElement = getByText('Teste');
		expect(buttonElement).toBeDefined();
	});

	test('calls onPress function when pressed', () => {
		const onPressMock = jest.fn();
		const { getByText } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Button title="Teste" onPress={onPressMock} />
			</NativeBaseProvider>
		);
		const buttonElement = getByText('Teste');

		fireEvent.press(buttonElement);
		expect(onPressMock).toHaveBeenCalledTimes(1);
	});
});
