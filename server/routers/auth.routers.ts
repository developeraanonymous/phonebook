import { Router } from 'express';
import {
	errorValidationMiddleware,
	validationMiddleware,
	authMiddleWare,
} from '../middlewares';
import { userController } from '../controllers';
export const authRouter = Router();

/* ---------------------------------- AUTH ---------------------------------- */
// Endpoint для регистрации
authRouter.post(
	'/registration',
	validationMiddleware.registerValidation,
	errorValidationMiddleware,
	userController.registration,
);

// Endpoint для логина
authRouter.post(
	'/login',
	validationMiddleware.loginValidation,
	errorValidationMiddleware,
	userController.login,
);

// Выход из авторизации
authRouter.post('/logout', userController.logout);

// Активация аккаунта по ссылке
// router.get('/activate/:link', userController.activate);

// Перезаписывает access token, если он умрет
authRouter.get('/refresh', userController.refreshTokens);
