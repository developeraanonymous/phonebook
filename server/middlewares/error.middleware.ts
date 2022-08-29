import express from 'express';
import ApiError from '../exceptions/api.error';

export const errorMiddleWare = (
	error: any,
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	console.log(error);
	if (error instanceof ApiError) {
		// Возвращаем ответ на клиент, передает статус ошибки из класса "ApiError"
		// Вызываем json и передаем данные, которые пойдут на клиент
		return res
			.status(error.status)
			.json({ message: error.message, errors: error.errors });
	}
	// Если что не предусмотрел и пошло не по плану возвращаем 500 ошибку
	return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
