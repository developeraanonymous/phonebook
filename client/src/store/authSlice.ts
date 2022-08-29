import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../@types/IUser';

interface AuthStateType<UserTypes> {
	userId: string;
	isAuth: boolean;
	isLoading: boolean;
	user: UserTypes;
}

const initialState: AuthStateType<IUser> = {
	userId: '',
	isAuth: false,
	isLoading: false,
	user: {
		email: '',
		isActivated: false,
		_id: ''
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserId(state, action: PayloadAction<string>) {
			state.userId = action.payload;
		},
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		},
		setIsAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload;
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
