import { AuthController } from '../controllers/auth.controllers.js';

import { RegisterUserUseCase } from '../services/usecases/auth/register-user.usecase.js';
import { LoginUserUseCase } from '../services/usecases/auth/login-user.usecase.js';
// import other use cases...

import { MongoUserRepository } from '../services/repositories/mongo/mongo-user.repository.js';
import { PasswordService } from '../services/security/password.service.js';
import { TokenService } from '../services/security/token.service.js';
// import { EmailService } from '../services/mail/mail.service.js';

const userRepository = new MongoUserRepository();
const passwordService = new PasswordService();
const tokenService = new TokenService();
// const emailService = new EmailService();

const registerUser = new RegisterUserUseCase(
	userRepository,
	passwordService,
	// emailService,
);

const loginUser = new LoginUserUseCase(
	userRepository,
	// passwordService,
	tokenService,
);

// ⚠️ names MUST match controller params
export const authController = AuthController({
	registerUser,
	loginUser,
	// logoutUser,
	// refreshToken,
	// verifyEmail,
	// resendVerification,
	// forgotPassword,
	// resetPassword,
	// changePassword,
});
