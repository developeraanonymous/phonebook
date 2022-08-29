import { check, body } from 'express-validator';

class ValidationMiddleware {
	loginValidation = [
		body('email', 'Неверный формат почты').isEmail(),
		body('password', 'Введите пароль').exists(),
	];

	registerValidation = [
		body('email', 'Неверный формат почты').isEmail(),
		body('password', 'Пароль должен быть минимум 5 символов').isLength({
			min: 5,
		}),
	];

	// 	contactCreateValidation = [
	// 		body('name', 'Введите имя').isLength({ min: 1 }).isString(),
	// 		body('phone', 'Введите номер телефона').isLength({ min: 1 }).isString(),
	// 	];
}

export const validationMiddleware = new ValidationMiddleware();
