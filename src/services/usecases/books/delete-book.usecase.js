import { ApiError } from '../../../utils/api-error.js';

export class DeleteBookUseCase {
	constructor(bookRepo) {
		this.bookRepo = bookRepo;
	}

	async execute(id) {
		const deletedBook = await this.bookRepo.delete(id);
		if (!deletedBook) throw new ApiError(404, 'Book not found');
		return deletedBook;
	}
}
