import bcrypt from 'bcrypt';

/**
 * Domain service responsible for password hashing and verification
 * No database, no framework dependencies
 */
export class PasswordService {
	constructor({ saltRounds = 12 } = {}) {
		this.saltRounds = saltRounds;
	}

	/**
	 * Hash a plain text password
	 */
	async hash(password) {
		if (!password) {
			throw new Error('Password is required for hashing');
		}
		return bcrypt.hash(password, this.saltRounds);
	}

	/**
	 * Compare plain password with hashed password
	 */
	async compare(plainPassword, hashedPassword) {
		if (!plainPassword || !hashedPassword) {
			return false;
		}
		return bcrypt.compare(plainPassword, hashedPassword);
	}
}
