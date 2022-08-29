/* ----------------------- Логика по работе с токенами ---------------------- */
import jwt from 'jsonwebtoken';
import { tokenModel } from '../models/';
import { Token, Id } from '../@types/base';

class TokenService {
	async generateTokens(payload: {}) {
		// Генерируем access token
		const accessToken = jwt.sign(
			payload,
			`${process.env.JWT_ACCESS_SECRET}`,
			{ expiresIn: '1h' },
		);
		// Генерируем refresh token
		const refreshToken = jwt.sign(
			payload,
			`${process.env.JWT_REFRESH_SECRET}`,
			{ expiresIn: '30d' },
		);
		return {
			accessToken,
			refreshToken,
		};
	}
	// Валидируем, что не подделан и срок годности не истек
	validateAccessToken(token: Token) {
		try {
			const userData = jwt.verify(
				token,
				`${process.env.JWT_ACCESS_SECRET}`,
			);
			return userData;
		} catch (error) {
			return null;
		}
	}
	validateRefreshToken(token: Token) {
		try {
			const userData = jwt.verify(
				token,
				`${process.env.JWT_REFRESH_SECRET}`,
			);
			return userData;
		} catch (error) {
			return null;
		}
	}

	async saveToken(userId: Id, refreshToken: Token) {
		// Ищем сначала токен в базе (Если вошел с другого устройства, то на старом токен умирает)
		const tokenData = await tokenModel.findOne({ user: userId });
		// Если в базе что-то нашли
		if (tokenData) {
			// Тогда у это поля перезаписываем refresh token
			tokenData.refreshToken = refreshToken;
			// Чтобы новый refresh token в базе обновился вызываем save
			return tokenData.save();
		}
		// если условие не выполнилось, значит пользователь зашел впервые
		const token = await tokenModel.create({ user: userId, refreshToken });
		// Как пользователь залонгинится, то сразу генерируем пару токенов (refreshToken сохраняем в базу по id пользователя)
		return token;
	}
	async removeToken(refreshToken: Token) {
		const tokenData = await tokenModel.deleteOne({ refreshToken });
		return tokenData;
	}
	// Ищем токен в базе
	async findToken(refreshToken: Token) {
		const tokenData = await tokenModel.findOne({ refreshToken });
		return tokenData;
	}
}

export const tokenService = new TokenService();
