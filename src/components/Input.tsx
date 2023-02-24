import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
	Input as NativeBaseInput,
	IInputProps,
	FormControl,
	Icon,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type InputProps = IInputProps & {
	errorMessage?: string | null;
};

export function Input({
	errorMessage,
	secureTextEntry,
	isInvalid,
	...rest
}: InputProps) {
	const [show, setShow] = useState(false);
	const invalid = !!errorMessage || isInvalid;

	return (
		<FormControl isInvalid={invalid} mb={4}>
			<NativeBaseInput
				bg="gray.100"
				h={14}
				px={4}
				borderWidth={0}
				fontSize="md"
				color="gray.700"
				fontFamily="body"
				mb={4}
				placeholderTextColor="gray.400"
				isInvalid={invalid}
				_invalid={{
					borderWidth: 1,
					borderColor: 'red.500',
				}}
				_focus={{
					bg: 'gray.100',
					borderWidth: 1,
					borderColor: 'blue.500',
				}}
				borderRadius={6}
				secureTextEntry={secureTextEntry && !show}
				InputRightElement={
					secureTextEntry ? (
						<TouchableOpacity onPress={() => setShow(!show)}>
							<Icon
								as={
									<MaterialIcons
										name={show ? 'visibility-off' : 'visibility'}
									/>
								}
								size={5}
								mr="3"
								color="gray.400"
							/>
						</TouchableOpacity>
					) : (
						<></>
					)
				}
				{...rest}
			/>
			<FormControl.ErrorMessage _text={{ color: 'red.500' }}>
				{errorMessage}
			</FormControl.ErrorMessage>
		</FormControl>
	);
}
