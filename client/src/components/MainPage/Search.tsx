import React from 'react';
import { useInput } from '../../hooks/useInput';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Search: React.FC = () => {
	const { val, bind, clearInput } = useInput('');
	const { contactsState } = useTypedSelector((state) => state.appReducer);

	// Search close
	const searchCollapse = (e: any) => {
		// очищаем инпут
		clearInput();
	};

	// Search FILTER
	const searchFilter = contactsState.filter((value) => {
		if (value.name.toLowerCase().includes(val.toLowerCase())) {
			return true;
		}
		if (value.phone.toLowerCase().includes(val.toLowerCase())) {
			return true;
		}
		return false;
	});

	return (
		<section className="search main__search __wrapper">
			<div className="__container">
				<div className={`search-container`}>
					<div className="search__icon"></div>
					<div className="search__bar">
						<form action="">
							<input
								{...bind}
								type="text"
								placeholder="Search on takeoff phonebook"
							/>
						</form>
					</div>
					{bind.value && (
						<div
							className="search__icon-close"
							onClick={searchCollapse}></div>
					)}
					{bind.value && (
						<div className="search-autocomplete">
							<h2>Search result</h2>
							<div className="main__search-autocomplete">
								<ul>
									{searchFilter
										.slice(0, 15)
										.map(({ name, phone, _id }) => (
											<li key={_id}>
												<span>{name}</span>
												<span>{phone}</span>
											</li>
										))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default Search;
