import { Router } from 'express';
import { authController } from '../container/auth.container.js';

import { validate } from '../middlewares/validator.middleware.js';
// import { verifyJWT } from '../middlewares/auth.middleware.js';

import {
	userLoginValidator,
	userRegisterValidator,
} from '../validators/index.js';

const router = Router();

/* -------------------- PUBLIC ROUTES -------------------- */

router.post(
	'/register',
	userRegisterValidator(),
	validate,
	authController.register,
);

router.post('/login', userLoginValidator(), validate, authController.login);

export default router;
