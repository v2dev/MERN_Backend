import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export class TokenService {
	generateAccessToken(payload) {
		if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
			throw new Error('JWT payload must be a plain object');
		}

		return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
		});
	}

	generateRefreshToken(payload) {
		if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
			throw new Error('JWT payload must be a plain object');
		}

		return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
		});
	}

	generateTemporaryToken(expiryMinutes = 20) {
		const rawToken = crypto.randomBytes(20).toString('hex');
		const hashedToken = crypto
			.createHash('sha256')
			.update(rawToken)
			.digest('hex');

		return {
			rawToken,
			hashedToken,
			expiresAt: Date.now() + expiryMinutes * 60 * 1000,
		};
	}
}
