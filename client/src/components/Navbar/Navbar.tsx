import { useActions } from '../../hooks/useActions';
import { IUser } from '../../@types/IUser';
import { AuthController } from '../../services';

export const Navbar: React.FC = () => {
	const { setUser, setIsAuth, setUserId, setContactsState } = useActions();

	const logout = async () => {
		try {
			await AuthController.logout();
			localStorage.removeItem('token');
			setIsAuth(false);
			setUser({} as IUser);
			setUserId('');
			setContactsState([]);
		} catch (error) {
			console.log(error.response?.data?.message);
		}
	};

	return (
		<nav className="page__nav">
			<div className="__container">
				<div className="nav__items container">
					<div className="__container">
						<div className="nav__item">
							<div className="__container">
								<h1>Takeoff phonebook</h1>
							</div>
						</div>
						<div className="nav__item">
							<div className="__container">
								<button
									className="nav__button"
									onClick={() => logout()}>
									Quit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
