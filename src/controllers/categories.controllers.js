import { Category } from "../models/category.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createCategory = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // ✅ debug
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategories = asyncHandler(async (req, res) => {

    //To fetch only usernames from User model
    // const lists = await User.find({}, { username: 1, _id: 0 })

    //To fetch all fields except password and refreshToken
    const lists = await Category.find()
     .select('-password -refreshToken')
    .lean();

    if (!res.status(200)) {
        throw new ApiError(404, "No Categories found");
    }

    lists.forEach(list => {
        console.log("List Username: ", list);
    });

    return res
    .status(200)
    .json(new ApiResponse(200, { lists: lists }, "Lists fetched successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {

  const { id } = req.params;   // ✅ get id from URL

  const category = await Category.findById(id)
    .select("-password -refreshToken")
    .lean();

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { contact }, "Contact fetched successfully")
    );
});



