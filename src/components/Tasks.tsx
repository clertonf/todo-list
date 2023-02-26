import React from 'react';

import { Heading, HStack, VStack, Text } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { TaskDTO } from '@dtos/TaskDTO';

type Props = TouchableOpacityProps & {
	data: TaskDTO;
	onPress?: () => void;
};

export function Tasks({ data, onPress, ...rest }: Props) {
	return (
		<TouchableOpacity onPress={onPress} {...rest}>
			<HStack
				bg="gray.500"
				alignItems="center"
				p={3}
				pr={4}
				rounded="md"
				mb={3}
				borderWidth={0.5}
				borderColor="gray.200"
			>
				<VStack flex={1}>
					<VStack flexDirection="row" justifyContent="space-between">
						<Heading fontSize="md" color="white" fontFamily="heading">
							{data.title}
						</Heading>
					</VStack>

					<Text fontSize="sm" color="gray.300" mt={1} numberOfLines={2}>
						{data.description}
					</Text>

					<Text fontSize="md" color="blue.400" mt={1}>
						{data.date}
					</Text>
				</VStack>
			</HStack>
		</TouchableOpacity>
	);
}
