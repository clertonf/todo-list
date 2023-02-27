import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
	name: 'task',
	initialState: {
		infoTask: {},
	},
	reducers: {
		chooseSetTask: (state, action) => {
			state.infoTask = action.payload;
		},
	},
});

export const reducerInfoTask = taskSlice.reducer;

export const { chooseSetTask } = taskSlice.actions;
