import { AxiosResponse } from 'axios';
import { AuthResponse } from '../@types/AuthResponse';
import $api from '../api';

class AuthController {
	async login(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/login', { email, password });
	}

	async registration(
		email: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post<AuthResponse>('/auth/registration', {
			email,
			password,
		});
	}

	async logout(): Promise<void> {
		return $api.post('/auth/logout');
	}
}

export default new AuthController();
