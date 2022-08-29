import { AxiosResponse } from 'axios';
import { AuthResponse } from '../@types/AuthResponse';
import $api from '../api';
import { IContacts } from '../@types/IUser';

export default class ContactsController {
	static async createContact(): Promise<AxiosResponse<IContacts[]>> {
		return $api.post<IContacts[]>('/contacts');
	}

	static async fetchContacts(): Promise<AxiosResponse<IContacts[]>> {
		return $api.get<IContacts[]>('/contacts');
	}

	static async removeContacts(): Promise<AxiosResponse<void>> {
		return $api.delete('/contacts');
	}
}
