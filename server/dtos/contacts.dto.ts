// import { IContacts } from '../models/Contact';

import { IContacts } from '../models/Contacts';

export type ContactsArray = [
	{
		name: string;
		phone: string;
		_id: string;
	},
];

export class ContactsDto {
	name: string;
	phone: string;
	_id: string;
	constructor(model: { name: string; phone: string; _id: string }) {
		this.name = model.name;
		this.phone = model.phone;
		this._id = model._id;
	}
}

export class ContactsGetDto {
	constructor(public model: IContacts[]) {}
}
