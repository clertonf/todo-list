import React from 'react';

import { Center, Spinner } from 'native-base';

export function Loading() {
	return (
		<Center testID="loading-component" flex={1} bg="gray.200">
			<Spinner color="blue.200" />
		</Center>
	);
}
