import { Router } from "express";
import {
	createContact,
	getAllContacts,
	getContactById,
} from '../controllers/contact.controllers.js';

const router = Router();

router.route('/').post(createContact);
router.route('/').get(getAllContacts);
router.route('/:id').get(getContactById);


export default router;
