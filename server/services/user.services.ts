/* --- Хэш пароля, проверка email в базе, ссылка для активации и отправки --- */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../models/';
import ApiError from '../exceptions/api.error';
import { Login, Token } from '../@types/base';
import { UserDto } from '../dtos/';
import { tokenService } from '.';
// import mailService from './mail-service';

class UserServices {
	async registration(email: Login, password: Login) {
		// Проверяем есть ли такой уже пользователь в базе
		const isCandidate = await userModel.findOne({ email });
		// Если email занят или не существует то....
		if (isCandidate) {
			throw ApiError.BadRequiest('Неверный логин или пароль!');
		}

		// Хэшируем пароль
		const hashPassword = await bcrypt.hash(password, 12);

		// Генерируем ссылку
		const activationLink = uuidv4();

		// Создаем пользователя в базе, если if не сработал и такого email нет
		const user = await userModel.create({
			email,
			password: hashPassword,
			activationLink,
		});

		// Отправляем user на клиент
		const userDto = new UserDto(user); // будет обладать 3 полями email, id, isActivated = это payload

		// Дергаем пару токенов access и refresh
		const tokens = await tokenService.generateTokens({ ...userDto });
		// Сохраняем refresh token в базу данных
		await tokenService.saveToken(userDto._id, tokens.refreshToken);
		// Возвращаем информацию о пользователе и токене
		return { ...tokens, user: userDto };
		// res.status(201).json({ message: 'Пользователь создан' });

		// Вызываем метод и передаем email пользователя и отправляется письмо для активации
		// await mailService.sendActivationMail(
		// 	email,
		// 	`${process.env.API_URL}/activate/${activationLink}`,
		// );
	}

	async login(email: Login, password: Login) {
		// Сначала убеждаемся зарегистрирован ли юзер а базе
		const isUser = await userModel.findOne({ email });
		// Если не найден
		if (!isUser) {
			throw ApiError.BadRequiest('Неверный email');
		}

		// Сравниваем пароль, отправленный юзером с паролем в базе
		const isPassMatch = await bcrypt.compare(password, isUser.password);
		// Если вернет false
		if (!isPassMatch) {
			throw ApiError.BadRequiest('Неверный пароль');
		}

		const userDto = new UserDto(isUser);

		// Дергаем пару токенов access и refresh
		const tokens = await tokenService.generateTokens({ ...userDto });
		// Сохраняем refresh token в базу данных
		await tokenService.saveToken(userDto._id, tokens.refreshToken);
		// Возвращаем информацию о пользователе и токене
		return { ...tokens, user: userDto };
	}

	async logout(refreshToken: Token) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refreshTokens(refreshToken: Token) {
		// Если не найден
		if (!refreshToken) {
			throw ApiError.UnAuthorizedError();
		}
		// Валидируем токен
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = tokenService.findToken(refreshToken);
		// Если не прошла валидация и не нашли токен в базе данных
		if (!userData || !tokenFromDb) {
			throw ApiError.UnAuthorizedError();
		}

		// @ts-ignore
		const user = await userModel.findById(userData._id);
		// Отправляем на клиент
		const userDto = new UserDto(user);

		// Дергаем пару токенов access и refresh
		const tokens = await tokenService.generateTokens({ ...userDto });
		// Сохраняем refresh token в базу данных
		await tokenService.saveToken(userDto._id, tokens.refreshToken);
		// Возвращаем информацию о пользователе и токене
		return { ...tokens, user: userDto };
	}
}

export const userService = new UserServices();
