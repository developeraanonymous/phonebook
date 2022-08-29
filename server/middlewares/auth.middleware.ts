import express from 'express';
import { access } from 'fs';
import ApiError from '../exceptions/api.error';
import { tokenService } from '../services/token.services';

export const authMiddleWare = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	try {
		// const refreshToken = (req.headers.cookie || '').replace(
		// 	'refreshToken=',
		// 	'',
		// );
		const accessToken = (req.headers.authorization || '').replace(
			/Bearer\s?/,
			'',
		);

		if (!accessToken) {
			return next(ApiError.UnAuthorizedError());
		}
		// @ts-ignore
		req.user = userData;
		next();
	} catch (error) {
		return next(ApiError.UnAuthorizedError());
	}
};
