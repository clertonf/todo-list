import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
	HStack,
	Heading,
	VStack,
	Text,
	Icon,
	AlertDialog,
	Button,
} from 'native-base';
import { useAuth } from '@hooks/useAuth';

type HeaderProps = {
	title: string;
	subtitle: string;
	showButtonLogout?: boolean;
};

export function Header({
	title,
	subtitle,
	showButtonLogout = false,
}: HeaderProps) {
	const { signOut } = useAuth();

	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef(null);

	return (
		<HStack pt={16} pb={5} px={6} alignItems="center" bgColor="gray.300">
			<VStack flex={1}>
				<Heading color="gray.700" fontSize="lg" fontFamily="heading">
					{title}
				</Heading>
				<Text color="gray.700" fontSize="md">
					{subtitle}
				</Text>
			</VStack>

			{showButtonLogout && (
				<TouchableOpacity onPress={() => setIsOpen(true)}>
					<Icon as={MaterialIcons} name="logout" color="white.100" size={7} />
				</TouchableOpacity>
			)}

			<AlertDialog
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<AlertDialog.Content>
					<AlertDialog.CloseButton />
					<AlertDialog.Header>Deletar tarefa</AlertDialog.Header>
					<AlertDialog.Body>
						Deseja realmente sair do aplicativo ?
					</AlertDialog.Body>
					<AlertDialog.Footer>
						<Button.Group space={2}>
							<Button
								variant="unstyled"
								colorScheme="coolGray"
								onPress={onClose}
								ref={cancelRef}
							>
								Cancelar
							</Button>
							<Button colorScheme="danger" onPress={signOut}>
								Sair
							</Button>
						</Button.Group>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog>
		</HStack>
	);
}
