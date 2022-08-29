import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchStateTypes {
	searchInputValue: string;
	desktopSearchState: boolean;
	searchResults: [];
}

const initialState: searchStateTypes = {
	searchInputValue: '',
	desktopSearchState: false,
	searchResults: [],
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchInputValue(state, action: PayloadAction<string>) {
			state.searchInputValue = action.payload;
		},
		setDesktopSearchState(state, action: PayloadAction<boolean>) {
			state.desktopSearchState = action.payload;
		},
		setSearchResults(state, action: PayloadAction<any>) {
			state.searchResults = action.payload;
		},
	},
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
