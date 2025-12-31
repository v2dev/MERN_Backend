import { ApiError } from '../../../utils/api-error.js';

export class EditBookUseCase {
	constructor(bookRepo) {
		this.bookRepo = bookRepo;
	}

	async execute(id, updateData) {
		const updatedBook = await this.bookRepo.update(id, updateData);
		if (!updatedBook) throw new ApiError(404, 'Book not found');
		return updatedBook;
	}
}
