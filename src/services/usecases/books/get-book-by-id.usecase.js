import { ApiError } from '../../../utils/api-error.js';

export class GetBookByIdUseCase {
	constructor(bookRepo) {
		this.bookRepo = bookRepo;
	}

	async execute(id) {
		const book = await this.bookRepo.findById(id);
		if (!book) throw new ApiError(404, 'Book not found');
		return book;
	}
}
