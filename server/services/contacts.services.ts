import { contactsModel, IContacts } from '../models';
import { ContactsGetDto, ContactsDto } from '../dtos/';

class ContactsServices {
	async create(name: string, phone: string, userId: string) {
		const contacts: IContacts = await contactsModel.create({
			owner: userId,
			name,
			phone,
		});
		// Отправляем user на клиент
		const contactsDto = new ContactsDto(contacts); // будет обладать 3 полями email, id, isActivated = это payload
		// Возвращаем информацию о пользователе и токене
		return { ...contactsDto };
	}

	async getContacts(userId: string) {
		const contacts: IContacts[] = await contactsModel.find({
			owner: userId,
		});
		if (contacts === null || undefined) {
			throw Error;
		}
		const contactsDto = new ContactsGetDto(contacts);
		return { ...contactsDto };
	}

	async deleteContact(contactId: string) {
		const deletedContact = await contactsModel.findOneAndDelete({
			_id: contactId,
		});
		return { deletedContact };
	}

	async updateContact(
		contactId: string,
		contactPhone: string,
		contactName: string,
	) {
		const changedContact = await contactsModel.updateOne(
			{
				_id: contactId,
			},
			{
				name: contactName,
				phone: contactPhone,
			},
		);
		return { changedContact };
	}
}

export const contactsService = new ContactsServices();
