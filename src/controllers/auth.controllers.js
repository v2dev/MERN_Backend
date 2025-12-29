export const AuthController = ({
	registerUser,
	loginUser,
	// logoutUser,
	// refreshToken,
	// verifyEmail,
	// resendVerification,
	// forgotPassword,
	// resetPassword,
	// changePassword,
}) => {
	return {
		register: async (req, res, next) => {
			try {
				const input = {
					...req.body,
					host: req.get('host'),
				};

				const result = await registerUser.execute(input);

				res.status(201).json(result);
			} catch (err) {
				next(err);
			}
		},

		login: async (req, res, next) => {
			try {
				const result = await loginUser.execute(req.body);

				res.status(200).json(result);
			} catch (err) {
				next(err);
			}
		},

		// logout: async (req, res, next) => {
		// 	try {
		// 		const result = await logoutUser.execute(req.user);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// refreshToken: async (req, res, next) => {
		// 	try {
		// 		const result = await refreshToken.execute(req, res);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// verifyEmail: async (req, res, next) => {
		// 	try {
		// 		const result = await verifyEmail.execute(req.params);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// resendVerification: async (req, res, next) => {
		// 	try {
		// 		const result = await resendVerification.execute(req.user);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// forgotPassword: async (req, res, next) => {
		// 	try {
		// 		const result = await forgotPassword.execute(req.body);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// resetPassword: async (req, res, next) => {
		// 	try {
		// 		const result = await resetPassword.execute(req.params, req.body);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// changePassword: async (req, res, next) => {
		// 	try {
		// 		const result = await changePassword.execute(req.user, req.body);
		// 		res.status(200).json(result);
		// 	} catch (err) {
		// 		next(err);
		// 	}
		// },

		// getCurrentUser: async (req, res) => {
		// 	res.status(200).json(req.user);
		// },
	};
};
