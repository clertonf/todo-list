import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ModalAlert } from '@components/ModalAlert';
import { NativeBaseProvider } from 'native-base';

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('ModalAlert', () => {
	const onCloseMock = jest.fn();
	const onPressMock = jest.fn();

	const defaultProps = {
		leastDestructiveRef: null,
		isOpen: true,
		onClose: onCloseMock,
		onPress: onPressMock,
		title: 'Title',
		subtitle: 'Subtitle',
		alertTitleButton: 'Confirm',
	};

	test('renders with correct props', () => {
		const { getByText, getByTestId } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<ModalAlert {...defaultProps} />
			</NativeBaseProvider>
		);

		const titleText = getByText('Title');
		expect(titleText).toBeTruthy();

		const subtitleText = getByText('Subtitle');
		expect(subtitleText).toBeTruthy();

		const cancelButton = getByText('Cancelar');
		expect(cancelButton).toBeTruthy();

		const confirmButton = getByText('Confirm');
		expect(confirmButton).toBeTruthy();
	});

	test('calls onClose when cancel button is pressed', () => {
		const { getByText } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<ModalAlert {...defaultProps} />
			</NativeBaseProvider>
		);
		const cancelButton = getByText('Cancelar');

		fireEvent.press(cancelButton);
		expect(onCloseMock).toHaveBeenCalled();
	});

	test('calls onPress when confirm button is pressed', () => {
		const { getByText } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<ModalAlert {...defaultProps} />
			</NativeBaseProvider>
		);
		const confirmButton = getByText('Confirm');

		fireEvent.press(confirmButton);
		expect(onPressMock).toHaveBeenCalled();
	});
});
