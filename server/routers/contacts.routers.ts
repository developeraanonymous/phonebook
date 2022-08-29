import { Router } from 'express';
import {
	errorValidationMiddleware,
	validationMiddleware,
	authMiddleWare,
} from '../middlewares';
import { contactsController } from '../controllers';
export const contactsRouter = Router();

/* ------------------------- CONTACTS ------------------------- */
//
contactsRouter.post(
	'/create',
	errorValidationMiddleware,
	contactsController.create,
);
// Получаем список контактов, доступен только для авторизованных
contactsRouter.get('/getAll', contactsController.getContacts);

// Изменение контакта
contactsRouter.patch('/update/:id', contactsController.updateContact);

// Удаление контакта
contactsRouter.delete('/delete/:id', contactsController.deleteContact);
