import { Router } from "express";
import {
	createBook,
	getBooks,
	getBookById,
	editItem,
	deleteBook,
	toggleFavorite,
} from '../controllers/book.controllers.js';

const router = Router();

// 🔥 COLLECTION ROUTE (search, sort, pagination)
router.route('/').post(createBook).get(getBooks);

// 🔥 SINGLE RESOURCE
router.route('/:id').get(getBookById).put(editItem).delete(deleteBook);

// 🔥 ACTION ON RESOURCE
router.route('/:id/favorite').patch(toggleFavorite);

export default router;
