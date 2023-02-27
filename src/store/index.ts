import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import { reducerInfoTask } from '../reducers/infoTask';
import { reducerTheme } from '../reducers/themes';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whiteList: [],
};

const reducer = combineReducers({
	reducerInfoTask,
	reducerTheme,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export const persistor = persistStore(store, null);
