export class CreateBookUseCase {
	constructor(bookRepo) {
		this.bookRepo = bookRepo;
	}

	async execute(bookData) {
		return await this.bookRepo.create(bookData);
	}
}
