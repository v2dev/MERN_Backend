import { Book } from '../../../models/book.models.js';

export class MongoBookRepository {
	create(bookData) {
		return Book.create(bookData);
	}

	findById(id) {
		return Book.findById(id).lean();
	}

	findAll({ search = '', sort, page = 1, limit = 20 }) {
		const filter = {};
		if (search.trim()) filter.name = { $regex: search, $options: 'i' };

		let query = Book.find(filter);

		if (sort === 'favorite') query = query.sort({ favorite: -1, name: 1 });

		const skip = (page - 1) * limit;
		return query.skip(skip).limit(Number(limit)).lean();
	}

	update(id, updateData) {
		return Book.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		}).lean();
	}

	delete(id) {
		return Book.findByIdAndDelete(id).lean();
	}

	toggleFavorite(id) {
		return Book.findById(id).then((book) => {
			if (!book) return null;
			book.favorite = !book.favorite;
			return book.save();
		});
	}
}
