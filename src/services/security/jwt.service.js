import jwt from 'jsonwebtoken';

export class JwtService {
	generateAccessToken(user) {
		return jwt.sign(
			{ id: user._id, email: user.email },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
		);
	}

	generateRefreshToken(user) {
		return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		});
	}
}
