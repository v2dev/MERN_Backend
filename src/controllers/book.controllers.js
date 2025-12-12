import { Book } from "../models/book.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createBook = async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json({
			success: true,
			data: book,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const getAllBooks = asyncHandler(async (req, res) => {
	const lists = await Book.find().lean();

	if (!res.status(200)) {
		throw new ApiError(404, 'No Books found');
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, { lists: lists }, 'Books data fetched successfully'),
		);
});

export const getBookById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id).lean();

	if (!book) {
		throw new ApiError(404, 'Book not found');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, { book }, 'Book fetched successfully'));
});

export const deleteBook = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const book = await Book.findByIdAndDelete(id).lean();

	if (!book) {
		throw new ApiError(404, 'Book not found');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, { book }, 'Book deleted successfully'));
});

export const editItem = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
		new: true, // return updated document
		runValidators: true,
	}).lean();

	if (!updatedBook) {
		throw new ApiError(404, 'Book not found');
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, { book: updatedBook }, 'Item updated successfully'),
		);
});

export const toggleFavorite = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);

	if (!book) {
		throw new ApiError(404, 'Book not found');
	}
	const newFavoriteValue = !book.favorite;
	book.favorite = newFavoriteValue;
	await book.save();
	return res
		.status(200)
		.json(new ApiResponse(200, { book }, 'Favorite toggled successfully'));
});

export const getAllBooksWithFavOnTop = asyncHandler(async (req, res) => {
	const { isFavOnTop } = req.params;

	// Convert string to boolean
	const sortFavoritesOnTop = isFavOnTop === 'true';

	let query = Book.find();

	// Apply sorting only if client wants favorites on top
	if (sortFavoritesOnTop) {
		query = query.sort({ favorite: -1 }); // true (1) first
	}

	const lists = await query.lean();

	if (!lists || lists.length === 0) {
		throw new ApiError(404, 'No Books found');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, { lists }, 'Books data fetched successfully'));
});









