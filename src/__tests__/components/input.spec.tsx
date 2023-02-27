import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@components/Input';
import { NativeBaseProvider } from 'native-base';

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Input component', () => {
	test('renders correctly', () => {
		const { getByTestId } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Input testID="test-input" />
			</NativeBaseProvider>
		);
		const inputElement = getByTestId('test-input');
		expect(inputElement).toBeDefined();
	});

	test('calls onChangeText function when text input changes', () => {
		const onChangeTextMock = jest.fn();
		const { getByTestId } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Input testID="test-input" onChangeText={onChangeTextMock} />
			</NativeBaseProvider>
		);
		const inputElement = getByTestId('test-input');

		fireEvent.changeText(inputElement, 'Hello world');
		expect(onChangeTextMock).toHaveBeenCalledWith('Hello world');
	});
});
