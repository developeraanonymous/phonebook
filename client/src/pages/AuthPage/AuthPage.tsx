import React from 'react';
import { useActions } from '../../hooks/useActions';
import AuthController from '../../services/AuthController';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const AuthPage = () => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const { userId } = useTypedSelector((state) => state.authReducer);
	const { setIsAuth, setUser, setUserId } = useActions();

	const login = async (email: string, password: string) => {
		try {
			const response = await AuthController.login(email, password);
			localStorage.setItem('token', response.data.accessToken);
			setIsAuth(true);
			setUser(response.data.user);
			setUserId(userId);
		} catch (error) {
			console.log(error.response?.data?.message);
		}
	};

	const registration = async (email: string, password: string) => {
		try {
			const response = await AuthController.registration(email, password);
			localStorage.setItem('token', response.data.accessToken);
			setIsAuth(true);
			setUser(response.data.user);
		} catch (error) {
			console.log(error.response?.data?.message);
		}
	};

	return (
		<div className="auth page__auth">
			<div className="__container">
				<div className="auth__form">
					<div className="__container">
						<h3>Добро пожаловать</h3>
						<div className="auth__inputs">
							<div className="__container">
								<input
									className="auth__input"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => setEmail(e.target.value)}
									value={email}
									type="email"
									name="email"
									placeholder="Email"
								/>
								<input
									className="auth__input"
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>,
									) => setPassword(e.target.value)}
									value={password}
									type="password"
									name="password"
									placeholder="password"
								/>
							</div>
						</div>
						<div className="auth__buttons">
							<div className="__container">
								<button
									className="auth__button"
									onClick={() => login(email, password)}>
									Войти
								</button>
								<button
									className="auth__button auth__button_border"
									onClick={() =>
										registration(email, password)
									}>
									Регистрация
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
