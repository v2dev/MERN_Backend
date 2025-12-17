import { Router } from 'express';
import {
	createContact,
	getContacts,
	getContactById,
	editContact,
	deleteContact,
	toggleFavorite,
} from '../controllers/contact.controllers.js';

const router = Router();

// 🔥 COLLECTION ROUTE (search, sort, pagination)
router.route('/').post(createContact).get(getContacts);

// 🔥 SINGLE RESOURCE
router.route('/:id').get(getContactById).put(editContact).delete(deleteContact);

// 🔥 ACTION ON RESOURCE
router.route('/:id/favorite').patch(toggleFavorite);

export default router;
