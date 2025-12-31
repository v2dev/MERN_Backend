import { ApiResponse } from '../utils/api-response.js';

export const BookController = ({
	createBook,
	getBooks,
	getBookById,
	editBook,
	deleteBook,
	toggleFavorite,
}) => ({
	create: async (req, res, next) => {
		try {
			const book = await createBook.execute(req.body);
			res
				.status(201)
				.json(new ApiResponse(201, { book }, 'Book created successfully'));
		} catch (err) {
			next(err);
		}
	},

	list: async (req, res, next) => {
		try {
			const lists = await getBooks.execute(req.query);
			res
				.status(200)
				.json(new ApiResponse(200, { lists }, 'Books fetched successfully'));
		} catch (err) {
			next(err);
		}
	},

	get: async (req, res, next) => {
		try {
			const book = await getBookById.execute(req.params.id);
			res
				.status(200)
				.json(new ApiResponse(200, { book }, 'Book fetched successfully'));
		} catch (err) {
			next(err);
		}
	},

	update: async (req, res, next) => {
		try {
			const updatedBook = await editBook.execute(req.params.id, req.body);
			res
				.status(200)
				.json(
					new ApiResponse(
						200,
						{ book: updatedBook },
						'Book updated successfully',
					),
				);
		} catch (err) {
			next(err);
		}
	},

	remove: async (req, res, next) => {
		try {
			const deletedBook = await deleteBook.execute(req.params.id);
			res
				.status(200)
				.json(
					new ApiResponse(
						200,
						{ book: deletedBook },
						'Book deleted successfully',
					),
				);
		} catch (err) {
			next(err);
		}
	},

	toggleFavorite: async (req, res, next) => {
		try {
			const book = await toggleFavorite.execute(req.params.id);
			res
				.status(200)
				.json(new ApiResponse(200, { book }, 'Favorite toggled successfully'));
		} catch (err) {
			next(err);
		}
	},
});
