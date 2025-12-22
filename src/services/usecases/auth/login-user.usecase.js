export class LoginUserUseCase {
	constructor(userRepo, tokenService) {
		this.userRepo = userRepo;
		this.tokenService = tokenService;

		console.log('LoginUserUseCase initialized userRepo :: ', userRepo);
	}

	async execute({ email, password }) {
		const user = await this.userRepo.findByEmailWithPassword(email);

		if (!user) {
			throw new Error('Invalid credentials');
		}

		// ⚠️ IMPORTANT: payload MUST be a plain object
		const accessToken = this.tokenService.generateAccessToken({
			userId: user._id.toString(),
			email: user.email,
			username: user.username,
		});

		const refreshToken = this.tokenService.generateRefreshToken({
			userId: user._id.toString(),
		});

		return {
			user: {
				id: user._id,
				email: user.email,
				username: user.username,
			},
			accessToken,
			refreshToken,
		};
	}
}
