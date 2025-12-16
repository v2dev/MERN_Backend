import { Contact } from '../models/contacts.models.js';
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createContact = async (req, res) => {
  try {
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

export const getAllContacts = asyncHandler(async (req, res) => {
	const lists = await Contact.find().lean();

	if (!res.status(200)) {
		throw new ApiError(404, 'No Contact found');
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				{ lists: lists },
				'Contacts data fetched successfully',
			),
		);
});

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

export const getAllContactsWithFavOnTop = asyncHandler(async (req, res) => {
	console.log('Fetching contacts with favorite on top ==> ', req.params);
	const { isFavOnTop } = req.params;

	// Convert string to boolean
	const sortFavoritesOnTop = isFavOnTop === 'true';

	let query = Contact.find();

	// Apply sorting only if client wants favorites on top
	if (sortFavoritesOnTop) {
		query = query.sort({ favorite: -1 }); // true (1) first
	}

	const lists = await query.lean();

	if (!lists || lists.length === 0) {
		throw new ApiError(404, 'No Contacts found');
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, { lists }, 'Contacts data fetched successfully'),
		);
});









