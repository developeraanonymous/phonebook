import mongoose from 'mongoose';

const UserSchema: mongoose.Schema = new mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true, unique: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	contacts: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Contact',
	},
});

export const userModel = mongoose.model('User', UserSchema);
