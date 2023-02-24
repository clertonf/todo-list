import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, VStack, Text, Icon, useTheme } from 'native-base';

import { Button } from './Button';

export function HomeHeader() {
	return (
		<HStack pt={16} pb={5} px={6} alignItems="center">
			<VStack flex={1}>
				<Text color="gray.700" fontSize="md">
					Boas vindas,
				</Text>

				<Heading color="gray.700" fontSize="lg" fontFamily="heading">
					Clerton!
				</Heading>
			</VStack>

			<Button
				w="139"
				title="Criar anúncio"
				bgColor="gray.700"
				onPress={() => {}}
				_pressed={{
					bgColor: 'gray.500',
				}}
				leftIcon={
					<Icon as={<MaterialIcons name="add" />} size={5} color="white" />
				}
				// isLoading={isLoading}
			/>
		</HStack>
	);
}
