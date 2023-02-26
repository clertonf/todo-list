import React, { useRef, useState } from 'react';

import {
	AlertDialog,
	Button,
	Heading,
	HStack,
	Image,
	VStack,
	Text,
	Icon,
	Menu,
} from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TaskDTO } from '@dtos/TaskDTO';

type Props = TouchableOpacityProps & {
	data: TaskDTO;
	onPress?: () => void;
};

export function Tasks({ data, onPress, ...rest }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const onClose = () => setIsOpen(false);

	const cancelRef = useRef(null);

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

					<Text
						fontSize="sm"
						color="gray.300"
						mt={1}
						numberOfLines={2}
						textTransform="capitalize"
					>
						{data.description}
					</Text>

					{/* <Text
						fontSize="md"
						color="blue.400"
						mt={1}
						numberOfLines={2}
						textTransform="capitalize"
					>
						21/02/1999
					</Text> */}
				</VStack>
			</HStack>
		</TouchableOpacity>
	);
}
