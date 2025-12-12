import { Router } from "express";
import {
	createBook,
	getAllBooks,
	getBookById,
	deleteBook,
	editItem,
	toggleFavorite,
	getAllBooksWithFavOnTop,
} from '../controllers/book.controllers.js';

const router = Router();

router.route('/').post(createBook);
router.route('/').get(getAllBooks);
router.route('/:id').get(getBookById);
router.route('/:id').delete(deleteBook);
router.route('/:id').put(editItem);
router.route('/:id/favorite').patch(toggleFavorite);
router.route('/favorites/top/:isFavOnTop').get(getAllBooksWithFavOnTop);

export default router;
