import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter, contactsRouter } from './routers';
import { errorMiddleWare } from './middlewares';

const app: express.Application = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3002;
const DB_URL = process.env.DB_URL;

// MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	}),
);
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use(errorMiddleWare);

const startServer = async () => {
	try {
		// Connect к базе MongoDB
		mongoose
			.connect(`${DB_URL}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: true,
			})
			.then(() => console.log('DB 👉 is connected!'))
			.catch(() => console.log('DB IS NOT CONNECTED!!!!'));

		app.listen(PORT, (): void => {
			console.log(`Server Running here 👉 https://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
