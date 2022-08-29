import React from 'react';
import axios from 'axios';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const AddInput: React.FC = () => {
	const { userId } = useTypedSelector((state) => state.authReducer);
	const [name, setName] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const { contactsState } = useTypedSelector((state) => state.appReducer);
	const { setContactsState } = useActions();

	const addContact = React.useCallback(async () => {
		if (!name && !phone) return null;
		try {
			await axios
				.post(
					'/api/contacts/create',
					{ name, phone, userId },
					{
						headers: { 'Content-Type': 'application/json' },
					},
				)
				.then((response) => {
					setContactsState([...contactsState, response.data]);
					setName('');
					setPhone('');
				});
		} catch (e) {
			console.log('Введите корректные данные');
		}
	}, [name, phone, userId]);

	return (
		<section className="main__form __wrapper">
			<div className="__container">
				<div className="main__inputs __wrapper">
					<div className="main__input __wrapper">
						<div className="__container">
							<input
								onChange={(e) => setName(e.target.value)}
								value={name}
								type="text"
								className="input form__input"
								name="name"
								placeholder="Имя"
								// onChange={}
							/>
						</div>
					</div>

					<div className="main__input __wrapper">
						<div className="__container">
							<input
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
								type="tel"
								className="input form__input"
								name="phone"
								placeholder="Номер телефона"
								// onChange={}
							/>
						</div>
					</div>
				</div>
				<div className="main__buttons">
					<button
						className="button button_blue main__button"
						onClick={addContact}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddInput;
