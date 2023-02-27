import { createSlice } from '@reduxjs/toolkit';
import { ETheme } from '../../@types/theme';

const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		theme: ETheme.themeLight,
	},
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const reducerTheme = themeSlice.reducer;

export const { changeTheme } = themeSlice.actions;
