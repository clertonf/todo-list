import { AuthContextProvider } from '@contexts/AuthContext';
import { render } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { View } from 'react-native';

const inset = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('Auth hook', () => {
	test('renders with children', () => {
		const { getByTestId } = render(
			<NativeBaseProvider initialWindowMetrics={inset}>
				<AuthContextProvider>
					<View testID="test-child" />
				</AuthContextProvider>
			</NativeBaseProvider>
		);

		expect(getByTestId('test-child')).toBeDefined();
	});
});
