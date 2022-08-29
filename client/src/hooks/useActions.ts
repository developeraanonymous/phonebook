import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { appActions } from '../store/appSlice';
import { searchActions } from '../store/searchSlice';
// import { setSearchState, setSearchFilter } from '../redux/slices/searchSlice';
// import { headerActions } from '../redux/slices/headerSlice';

// const searchActions = { setSearchState, setSearchFilter };

const allActions = {
	...authActions,
	...appActions,
	...searchActions,
};

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(allActions, dispatch);
};
