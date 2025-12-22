import { Router } from 'express';
import { authController } from '../container/auth.container.js';

import { validate } from '../middlewares/validator.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

import {
	userChangeCurrentPasswordValidator,
	userForgotPasswordValidator,
	userLoginValidator,
	userRegisterValidator,
	userResetForgotPasswordValidator,
} from '../validators/index.js';

const router = Router();

/* -------------------- PUBLIC ROUTES -------------------- */

router.post(
	'/register',
	userRegisterValidator(),
	validate,
	authController.register,
);

// router.post(
// 	'/signup',
// 	userRegisterValidator(),
// 	validate,
// 	authController.register,
// );

router.post('/login', userLoginValidator(), validate, authController.login);

// router.get('/verify-email/:verificationToken', authController.verifyEmail);

// router.post('/refresh-token', authController.refreshToken);

// router.post(
// 	'/forgot-password',
// 	userForgotPasswordValidator(),
// 	validate,
// 	authController.forgotPassword,
// );

// router.post(
// 	'/reset-password/:resetToken',
// 	userResetForgotPasswordValidator(),
// 	validate,
// 	authController.resetPassword,
// );

// /* -------------------- PROTECTED ROUTES -------------------- */

// router.post('/logout', verifyJWT, authController.logout);

// router.get('/current-user', verifyJWT, authController.getCurrentUser);

// router.post(
// 	'/change-password',
// 	verifyJWT,
// 	userChangeCurrentPasswordValidator(),
// 	validate,
// 	authController.changePassword,
// );

// router.post(
// 	'/resend-email-verification',
// 	verifyJWT,
// 	authController.resendVerification,
// );

export default router;
