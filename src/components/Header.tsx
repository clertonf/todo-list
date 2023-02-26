import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Heading, VStack, Text, Icon } from 'native-base';
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
				<TouchableOpacity onPress={signOut}>
					<Icon as={MaterialIcons} name="logout" color="white.100" size={7} />
				</TouchableOpacity>
			)}
		</HStack>
	);
}
