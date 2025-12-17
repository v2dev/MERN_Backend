import { Contact } from '../models/contacts.models.js';
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createContact = async (req, res) => {
	try {
		console.log('Request Body:', req.body);
		const contact = await Contact.create(req.body);
		res.status(201).json({
			success: true,
			data: contact,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export const getContactById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const contact = await Contact.findById(id).lean();

	if (!contact) {
		throw new ApiError(404, 'Contact not found');
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, { contact }, 'Contact details fetched successfully'),
		);
});

export const editContact = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: false,
	}).lean();

	if (!updatedContact) {
		throw new ApiError(404, 'Contact not found');
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ contact: updatedContact },
				'Contact updated successfully',
			),
		);
});

export const deleteContact = asyncHandler(async (req, res) => {
	const { id } = req.params;
	console.log('Contact ID from URL:', id);

	const contact = await Contact.findByIdAndDelete(id).lean();

	if (!contact) {
		throw new ApiError(404, 'Contact not found');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, { contact }, 'Contact deleted successfully'));
});

export const toggleFavorite = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const contact = await Contact.findById(id);

	if (!contact) {
		throw new ApiError(404, 'Contact not found');
	}
	const newFavoriteValue = !contact.favorite;
	contact.favorite = newFavoriteValue;
	await contact.save();
	return res
		.status(200)
		.json(new ApiResponse(200, { contact }, 'Favorite toggled successfully'));
});

export const getContacts = asyncHandler(async (req, res) => {
	const { search = '', sort, page = 1, limit = 20 } = req.query;

	const filter = {};

	// 🔍 Search by name only
	if (search.trim()) {
		filter.name = { $regex: search, $options: 'i' };
	}

	let query = Contact.find(filter);

	// ⭐ Favorites on top
	if (sort === 'favorite') {
		query = query.sort({ favorite: -1, name: 1 });
	}

	const skip = (page - 1) * limit;

	const lists = await query.skip(skip).limit(Number(limit)).lean();
	console.log('Fetched Contacts:', lists);

	return res
		.status(200)
		.json(new ApiResponse(200, { lists }, 'Contacts fetched successfully'));
});











