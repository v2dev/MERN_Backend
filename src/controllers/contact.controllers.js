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
    //To fetch all fields 
    const lists = await Contact.find()
    .lean();

    if (!res.status(200)) {
        throw new ApiError(404, "No Contact found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, { lists: lists }, "Contacts data fetched successfully"));
});

export const getContactById = asyncHandler(async (req, res) => {

  const { id } = req.params;  
  const contact = await Contact.findById(id).lean();

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { contact }, "Contact details fetched successfully")
    );
});







