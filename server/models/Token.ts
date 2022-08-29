import mongoose from 'mongoose';

const TokenSchema: mongoose.Schema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
});

export const tokenModel = mongoose.model('Token', TokenSchema);
