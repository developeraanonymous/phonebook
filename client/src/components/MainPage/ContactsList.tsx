import React from 'react';
import axios from 'axios';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import Modal from './Modal';

const ContactsList: React.FC = () => {
	const { userId, isAuth } = useTypedSelector((state) => state.authReducer);
	const { contactsState, modal, names, phones } = useTypedSelector(
		(state) => state.appReducer,
	);
	const { setContactsState, setModal, setNames, setPhones } = useActions();

	const getContacts = React.useCallback(async () => {
		try {
			await axios
				.get('/api/contacts/getAll', {
					headers: { 'Content-Type': 'application/json' },
					params: { userId },
				})
				.then((response) => {
					setContactsState(response.data);
				});
		} catch (e) {
			console.log(e);
		}
	}, [userId, setContactsState]);

	const deleteContact = async (_id: string) => {
		setContactsState(contactsState.filter((obj) => obj._id !== _id));

		try {
			await axios.delete(`/api/contacts/delete/${_id}`);
		} catch (e) {
			console.log(e);
		}
	};

	const updateContact = async (_id: string, name: string, phone: string) => {
		if (!names && !phones) return console.log('NULL');
		await axios.patch(
			`/api/contacts/update/${_id}`,
			{
				names,
				phones,
			},
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
		getContacts();
		setNames('');
		setPhones('');
		setModal(false);
	};

	React.useEffect(() => {
		if (userId) {
			getContacts();
		}
	}, [isAuth]);

	return (
		<section className="contacts main__contacts">
			<div className="__container">
				<div className="contacts__list contacts__contacts-list">
					<div className="__container">
						{contactsState &&
							contactsState.map(({ name, phone, _id }) => (
								<div
									key={_id}
									className="contacts__row __wrapper">
									<div className="__container">
										<div className="contacts__col">
											<>
												{/*         DATA      */}
												<div className="contacts__item">
													{name}
												</div>

												<div className="contacts__item">
													{phone}
												</div>
											</>
										</div>
										{/*         BUTTONS       */}
										<div className="contacts__col">
											<>
												<span
													className="contacts__button edit"
													onClick={() =>
														setModal(true)
													}
												/>

												<span
													className="contacts__button trash"
													onClick={() =>
														deleteContact(_id)
													}
												/>
												{modal && (
													<Modal
														data={[name, phone]}
														onClick={() =>
															updateContact(
																_id,
																name,
																phone,
															)
														}
													/>
												)}
											</>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactsList;
