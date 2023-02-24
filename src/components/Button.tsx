import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type ButtonProps = IButtonProps & {
	title: string;
	variant?: 'solid' | 'outline';
};

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
	return (
		<NativeBaseButton
			w="full"
			h={12}
			bg={variant === 'outline' ? 'gray.300' : 'blue.300'}
			borderWidth={variant === 'outline' ? 1 : 0}
			borderColor="gray.300"
			rounded="sm"
			_pressed={{
				bg: variant === 'outline' ? 'gray.200' : 'blue.500',
			}}
			borderRadius={6}
			{...rest}
		>
			<Text
				color={variant === 'outline' ? 'gray.600' : 'white'}
				fontFamily="heading"
				fontSize="sm"
			>
				{title}
			</Text>
		</NativeBaseButton>
	);
}
