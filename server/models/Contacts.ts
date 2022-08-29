import mongoose from 'mongoose';

export interface IContacts {
	name: string;
	phone: string;
	_id: string;
	owner: mongoose.Types.ObjectId;
}

const ContactSchema: mongoose.Schema = new mongoose.Schema({
	owner: { type: mongoose.Types.ObjectId, ref: 'User' },
	name: { type: String, required: true },
	phone: { type: String, required: true, unique: true },
});

export const contactsModel = mongoose.model<IContacts>(
	'Contact',
	ContactSchema,
);
