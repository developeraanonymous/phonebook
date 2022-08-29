import { useState, ChangeEvent } from 'react';

export const useInput = (initialValue: any) => {
	const [val, setVal] = useState(initialValue);

	const clearInput = () => {
		// Возвращаем в изначальное состояние (например после отправки форме, форма очищается)
		setVal(initialValue);
	};

	const bind = {
		value: val,
		onChange: (e: ChangeEvent<HTMLInputElement>) => setVal(e.target.value),
	};

	return { val, clearInput, bind };
};

// const {bind, val} = useInput('')
// <div {...bind} className='something'></div>
