/* ----------------------- Будем отправлять на клиент ----------------------- */
// DTO - data transfer object
export class UserDto {
	email: string;
	_id: string;
	isActivated: boolean;
	constructor(model: any) {
		this.email = model.email;
		// Нижнее подчеркивание в MongoDB - значит неизменяемое поле
		this._id = model._id.toHexString().trim();
		this.isActivated = model.isActivated;
	}
}
