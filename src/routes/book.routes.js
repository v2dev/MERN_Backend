import { Router } from 'express';
import { bookController } from '../container/book.container.js';

const router = Router();

// Collection routes
router.route('/').post(bookController.create).get(bookController.list);

// Single resource
router
	.route('/:id')
	.get(bookController.get)
	.put(bookController.update)
	.delete(bookController.remove);

// Action
router.route('/:id/favorite').patch(bookController.toggleFavorite);

export default router;
