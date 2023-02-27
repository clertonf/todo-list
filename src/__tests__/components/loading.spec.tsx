import React from 'react';
import { render } from '@testing-library/react-native';
import { Loading } from '@components/Loading';
import { NativeBaseProvider } from 'native-base';

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Loading component', () => {
	test('renders correctly', () => {
		const { getByTestId } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<Loading />
			</NativeBaseProvider>
		);
		const loadingElement = getByTestId('loading-component');
		expect(loadingElement).toBeDefined();
	});
});
