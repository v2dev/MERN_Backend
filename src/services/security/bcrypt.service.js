import bcrypt from 'bcrypt';

export class BcryptService {
	async hash(password) {
		return bcrypt.hash(password, 12);
	}

	async compare(password, hash) {
		return bcrypt.compare(password, hash);
	}
}
