import axios from 'axios';
import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface Click {
	onClick: any;
	data: string[];
}

const Modal: React.FC<Click> = ({ onClick, data }) => {
	const { names, phones } = useTypedSelector((state) => state.appReducer);
	const { setNames, setPhones } = useActions();

	return (
		<div className="modal main__modal">
			<div className="__container">
				<div className="main__inputs">
					<div className="main__input __wrapper">
						<div className="__container">
							<input
								onChange={(e) => setNames(e.target.value)}
								value={names}
								type="text"
								className="input form__input"
								name="name"
								placeholder="Имя"
							/>
						</div>
					</div>

					<div className="main__input __wrapper">
						<div className="__container">
							<input
								onChange={(e) => setPhones(e.target.value)}
								value={phones}
								type="tel"
								className="input form__input"
								name="phone"
								placeholder="Номер телефона"
							/>
						</div>
					</div>
				</div>
				<div className="main__buttons">
					<button
						className="button button_blue main__button"
						onClick={onClick}>
						Изменить
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
