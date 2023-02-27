import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, VStack, Icon } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import { ModalAlert } from './ModalAlert';
import { DarkMode } from './DarkMode';

type HeaderProps = {
	title: string;
	showButtonLogout?: boolean;
	showButtonDarkMode?: boolean;
};

export function Header({
	title,
	showButtonLogout = false,
	showButtonDarkMode = false,
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

				{showButtonDarkMode && <DarkMode mt={2} />}
			</VStack>

			{showButtonLogout && (
				<TouchableOpacity onPress={() => setIsOpen(true)}>
					<Icon as={MaterialIcons} name="logout" color="red.300" size={7} />
				</TouchableOpacity>
			)}

			<ModalAlert
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
				onClose={onClose}
				onPress={signOut}
				title="Sair do app"
				subtitle="Deseja realmente sair do aplicativo ?"
				alertTitleButton="Sair"
			/>
		</HStack>
	);
}
