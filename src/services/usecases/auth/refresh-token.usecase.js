export class RefreshTokenUseCase {
	constructor(userRepo, tokenService) {
		this.userRepo = userRepo;
		this.tokenService = tokenService;
	}

	async execute(refreshToken) {
		const payload = this.tokenService.verifyRefreshToken(refreshToken);

		const user = await this.userRepo.findById(payload.id);
		if (!user || user.refreshToken !== refreshToken)
			throw new Error('Invalid refresh token');

		const newAccess = this.tokenService.generateAccessToken(user);
		const newRefresh = this.tokenService.generateRefreshToken(user);

		await this.userRepo.updateRefreshToken(user._id, newRefresh);

		return { accessToken: newAccess, refreshToken: newRefresh };
	}
}
