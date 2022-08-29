export default class ApiError extends Error {
	status: number;
	errors: string[];

	constructor(status: number, message: string, errors: string[] = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}
	static UnAuthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован');
	}

	static UnAuthorizedError2() {
		return new ApiError(401, 'Пользователь не авторизован??????');
	}

	static BadRequiest(message: string, errors = []) {
		return new ApiError(400, message, errors);
	}
}
