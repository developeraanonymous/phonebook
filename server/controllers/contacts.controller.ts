import express from 'express';
import { contactsService } from '../services';
class ContactsController {
	async create(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			// После успешной валидации вытягиваем поля
			const { name, phone, userId } = req.body;
			const contactInfo = await contactsService.create(
				name,
				phone,
				userId,
			);
			// Эта функция возвращает информацию о пользователе, нужно вернуть ее на клиент
			return res.json(contactInfo);
		} catch (error) {
			// Если в next попадает api-errror, он будет обработан соответствующим образом и попадаем в errorMiddleWare
			next(error);
		}
	}

	async getContacts(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const { userId } = req.query;
			if (userId === undefined) {
				throw console.log('Ошибка при получении ID');
			}
			// @ts-ignore
			const contacts = await contactsService.getContacts(userId);
			const { model } = contacts;
			//? console.log('getContacts??', model);
			return res.json(model);
		} catch (error) {
			// Если в next попадает api-errror, он будет обработан соответствующим образом и попадаем в errorMiddleWare
			next(error);
		}
	}

	async getOne(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
		} catch (error) {
			// Если в next попадает api-errror, он будет обработан соответствующим образом и попадаем в errorMiddleWare
			next(error);
		}
	}

	async updateContact(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const contactId = req.params.id;
			const contactName = req.body.names;
			const contactPhone = req.body.phones;

			const changedContact = await contactsService.updateContact(
				contactId,
				contactPhone,
				contactName,
			);
			return res.json(changedContact);
		} catch (error) {
			next(error);
		}
	}

	async deleteContact(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const contactId = req.params.id;

			const contactDeleted = await contactsService.deleteContact(
				contactId,
			);
			return res.json(contactDeleted);
		} catch (error) {
			next(error);
		}
	}
}

export const contactsController = new ContactsController();
