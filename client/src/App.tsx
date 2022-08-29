import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
// import AuthPage from './pages/AuthPage/!AuthPage';
import AuthPage from './pages/AuthPage/AuthPage';
import { useTypedSelector } from './hooks/useTypedSelector';
import { API_AUTH_URL } from './api';
import axios from 'axios';
import { AuthResponse } from './@types/AuthResponse';
import { useActions } from './hooks/useActions';
import MainPage from './pages/MainPage/MainPage';

const App: React.FC = () => {
	const { isAuth, isLoading, user } = useTypedSelector(
		(state) => state.authReducer,
	);
	const { setIsAuth, setUser, setIsLoading, setUserId } = useActions();

	const checkAuth = React.useCallback(async () => {
		setIsLoading(true);
		try {
			// 		/**
			// 		 * Здесь не используем инстанс axios, на который повесили интерсепторы
			// 		 * Используем дефолтный инстанс axios, в случае возникновения ошибки 404
			// 		 * Тогда мы уже четко будем знать, что пользователь не авторизован
			// 		 */
			const response = await axios.get<AuthResponse>(
				`${API_AUTH_URL}/auth/refresh`,
				{
					withCredentials: true,
				},
			);
			localStorage.setItem('token', response.data.accessToken);
			setIsAuth(true);
			setUser(response.data.user);
		} catch (e) {
			console.log('checkAuth - catch     ', e.response?.data?.message);
		} finally {
			setIsLoading(false);
		}
	}, [user._id, isAuth]);

	React.useEffect(() => {
		// Проверяем, если в localstorage что то есть по ключу "token"
		if (localStorage.getItem('token')) {
			checkAuth();
		}
		setUserId(user._id);
	}, [user._id]);

	if (isLoading) {
		return <div className="loading">Загрузка...</div>;
	}

	return (
		<div className="page container">
			<div className="__container">
				<Navbar />

				{!isAuth && <AuthPage />}
				{isAuth && <MainPage />}
			</div>
		</div>
	);
};

export default App;
