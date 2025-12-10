import { Router } from "express";
import {
	createBook,
	getAllBooks,
	getBookById,
	deleteBook,
	editItem,
} from '../controllers/book.controllers.js';

const router = Router();

router.route('/').post(createBook);
router.route('/').get(getAllBooks);
router.route('/:id').get(getBookById);
router.route('/:id').delete(deleteBook);
router.route('/:id').put(editItem);

export default router;
