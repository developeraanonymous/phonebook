import express from 'express';
import { validationResult } from 'express-validator';

export const errorValidationMiddleware = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const errors = validationResult(req);
	// Проверяем находится ли что то в errors?
	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
			message: 'Введены некорректные данные',
		});
	}
	next();
};
