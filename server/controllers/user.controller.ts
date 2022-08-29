import express from 'express';
import { userService } from '../services';
class UserController {
	/* ------------------------------- Регистрация ------------------------------ */
	async registration(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			// После успешной валидации вытягиваем поля
			const { email, password } = req.body;
			const userData = await userService.registration(email, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			// Эта функция возвращает токены и информацию о пользователе, нужно вернуть ее на клиент
			return res.json(userData);
		} catch (error) {
			// Если в next попадает api-errror, он будет обработан соответствующим образом и попадаем в errorMiddleWare
			next(error);
		}
	}

	/* ------------------------------- Авторизация ------------------------------ */
	async login(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			// Вытаскиваем email и пароль
			const { email, password } = req.body;
			const userData = await userService.login(email, password);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			// Эта функция возвращает токены и информацию о пользователе, нужно вернуть ее на клиент
			console.log(userData);
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json(token);
		} catch (error) {
			// Если в next попадает api-errror, он будет обработан соответствующим образом и попадаем в errorMiddleWare
			next(error);
		}
	}

	async refreshTokens(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refreshTokens(refreshToken);
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
