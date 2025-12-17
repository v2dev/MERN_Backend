import { Book } from '../models/book.models.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';

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

export const getBooks = asyncHandler(async (req, res) => {
	const { search = '', sort, page = 1, limit = 20 } = req.query;

	const filter = {};

	// 🔍 Search by name only
	if (search.trim()) {
		filter.name = { $regex: search, $options: 'i' };
	}

	let query = Book.find(filter);

	// ⭐ Favorites on top
	if (sort === 'favorite') {
		query = query.sort({ favorite: -1, name: 1 });
	}

	const skip = (page - 1) * limit;

	const lists = await query.skip(skip).limit(Number(limit)).lean();

	return res
		.status(200)
		.json(new ApiResponse(200, { lists }, 'Books fetched successfully'));
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
