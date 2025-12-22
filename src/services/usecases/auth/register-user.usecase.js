export class RegisterUserUseCase {
	constructor(userRepo, passwordService, tokenService, mailService) {
		
		this.userRepo = userRepo;
		this.passwordService = passwordService;
		this.tokenService = tokenService;
		this.mailService = mailService;
	}

	async execute({ email, username, password, category, host }) {
		console.log('RegisterUserUseCase initialized userRepo :: ', this.userRepo);
		const exists = await this.userRepo.findByEmailOrUsername(email, username);
		if (exists) throw new Error('User already exists');

		const hashedPassword = await this.passwordService.hash(password);

		const user = await this.userRepo.create({
			email,
			username,
			password: hashedPassword,
			category,
			isEmailVerified: false,
		});

		// const token = this.tokenService.generateTemporaryToken();

		// await this.userRepo.setEmailVerification(
		// 	user._id,
		// 	token.hashedToken,
		// 	token.expiresAt,
		// );

		// await this.mailService.sendVerification(
		// 	user.email,
		// 	user.username,
		// 	`${host}/api/v1/users/verify-email/${token.rawToken}`,
		// );

		return { id: user._id, email: user.email };
	}
}
