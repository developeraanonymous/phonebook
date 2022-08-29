import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './authSlice';
import appReducer from './appSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
	reducer: {
		authReducer,
		appReducer,
		searchReducer,
		// [timeZonesApi.reducerPath]: timeZonesApi.reducer,
	},
	// middleware: (getDefaultMiddleware) =>
	//     getDefaultMiddleware().concat(timeZonesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
