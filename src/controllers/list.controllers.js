import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const getAllLists = asyncHandler(async (req, res) => {

    //To fetch only usernames from User model
    // const lists = await User.find({}, { username: 1, _id: 0 })

    //To fetch all fields except password and refreshToken
    const lists = await User.find()
     .select('-password -refreshToken')
    .lean();

    if (!res.status(200)) {
        throw new ApiError(404, "No lists found");
    }

    lists.forEach(list => {
        console.log("List Username: ", list);
    });

    return res
    .status(200)
    .json(new ApiResponse(200, { lists: lists }, "Lists fetched successfully"));
});

const getContactById = asyncHandler(async (req, res) => {

  const { id } = req.params;   // ✅ get id from URL
  console.log("Contact ID from URL:", id); // ✅ debug

  const contact = await User.findById(id)
    .select("-password -refreshToken")
    .lean();

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { contact }, "Contact fetched successfully")
    );
});

const getContactsByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;   // this id is categoryId
  console.log("Category ID from URL:", id);

  const contacts = await User.find({ category: id })
    .select("-password -refreshToken")
    .lean();

  if (!contacts || contacts.length === 0) {
    throw new ApiError(404, "No contacts found for this category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { contacts }, "Contacts fetched successfully")
    );
});

export { getAllLists , getContactById, getContactsByCategory};

