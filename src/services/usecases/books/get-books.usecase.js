export class GetBooksUseCase {
	constructor(bookRepo) {
		this.bookRepo = bookRepo;
	}

	async execute(queryParams) {
		return await this.bookRepo.findAll(queryParams);
	}
}
