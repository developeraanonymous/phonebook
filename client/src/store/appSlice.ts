import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppStateType = {
	contactsState: any[];
	contactId: string;
	updateList: object;
	modal: boolean;
	names: string;
	phones: string;
};

const initialState: AppStateType = {
	contactsState: [],
	updateList: null,
	contactId: '',
	modal: false,
	names: '',
	phones: '',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setContactsState(state, action: PayloadAction<any[]>) {
			state.contactsState = action.payload;
		},
		setUpdateList(state, action: PayloadAction<any>) {
			state.updateList = action.payload;
		},
		setContactId(state, action: PayloadAction<string>) {
			state.contactId = action.payload;
		},
		setModal(state, action: PayloadAction<boolean>) {
			state.modal = action.payload;
		},
		setNames(state, action: PayloadAction<string>) {
			state.names = action.payload;
		},
		setPhones(state, action: PayloadAction<string>) {
			state.phones = action.payload;
		},
	},
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
