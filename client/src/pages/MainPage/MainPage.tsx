import React from 'react';
import AddInput from '../../components/MainPage/AddInput';
import ContactsList from '../../components/MainPage/ContactsList';
import Search from '../../components/MainPage/Search';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const MainPage: React.FC = () => {
	const { modal } = useTypedSelector((state) => state.appReducer);
	const { setModal } = useActions();

	return (
		<main className="main page__main __wrapper">
			<>
				<div className="__container">
					{/*               SEARCH                   */}
					<Search />
					{/*         Блок добавления контакта       */}
					<AddInput />
					{/*	            Список контактов           */}
					<ContactsList />
				</div>
				<div
					onClick={() => setModal(false)}
					className={`overlay ${modal === true ? 'show' : ''}`}></div>
			</>
		</main>
	);
};

export default MainPage;
