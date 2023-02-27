import { AlertDialog, Button, IAlertProps } from 'native-base';
import React from 'react';

type ModalAlertProps = IAlertProps & {
	leastDestructiveRef: any;
	isOpen: boolean;
	onClose: () => void;
	onPress: () => void;
	title: string;
	subtitle: string;
	alertTitleButton: string;
};

export function ModalAlert({
	leastDestructiveRef,
	isOpen,
	onClose,
	onPress,
	title,
	subtitle,
	alertTitleButton,
	...rest
}: ModalAlertProps) {
	return (
		<AlertDialog
			leastDestructiveRef={leastDestructiveRef}
			isOpen={isOpen}
			onClose={onClose}
			{...rest}
		>
			<AlertDialog.Content>
				<AlertDialog.CloseButton />
				<AlertDialog.Header
					bgColor="gray.100"
					_text={{
						color: 'gray.700',
					}}
				>
					{title}
				</AlertDialog.Header>
				<AlertDialog.Body
					bgColor="gray.100"
					_text={{
						color: 'gray.700',
					}}
				>
					{subtitle}
				</AlertDialog.Body>
				<AlertDialog.Footer bgColor="gray.100">
					<Button.Group space={2}>
						<Button
							variant="unstyled"
							colorScheme="coolGray"
							onPress={onClose}
							ref={leastDestructiveRef}
							bgColor="gray.200"
							_text={{
								color: 'gray.700',
							}}
						>
							Cancelar
						</Button>
						<Button colorScheme="danger" onPress={onPress}>
							{alertTitleButton}
						</Button>
					</Button.Group>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	);
}
