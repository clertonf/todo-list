import React from 'react';
import { Button, Icon, IButtonProps } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

import { changeTheme } from '@reducers/themes';

type DarkModeProps = IButtonProps & {};

export function DarkMode({ ...rest }: DarkModeProps) {
	const dispatch = useDispatch();

	const { theme: SelectedTheme } = useSelector(
		(state: any) => state.reducerTheme
	);

	function changeThemeAllApplication() {
		if (SelectedTheme === 'themeLight') {
			dispatch(changeTheme('themeDark'));
		} else {
			dispatch(changeTheme('themeLight'));
		}
	}

	return (
		<Button
			rounded="full"
			w="34"
			h="34"
			onPress={changeThemeAllApplication}
			bgColor="icon.100"
			{...rest}
		>
			<Icon
				as={<Feather name={SelectedTheme === 'themeLight' ? 'moon' : 'sun'} />}
				size={5}
				color="icon.0"
			/>
		</Button>
	);
}
