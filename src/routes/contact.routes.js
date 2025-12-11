import { Router } from "express";
import {
	createContact,
	getAllContacts,
	getContactById,
	editContact,
	deleteContact,
} from '../controllers/contact.controllers.js';

const router = Router();

router.route('/').post(createContact);
router.route('/').get(getAllContacts);
router.route('/:id').get(getContactById);
router.route('/:id').put(editContact);
router.route('/:id').delete(deleteContact);

export default router;
