import { Category } from "../models/category.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import { Book } from "../models/book.models.js";

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
    //To fetch all fields
    const lists = await Category.find()
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

export const getCategoryType = asyncHandler(async (req, res) => {
  const { id } = req.params; // categoryId

  // Fetch only the required category
  const category = await Category.findById(id).lean();
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { type: category.type, category },
      "Category type fetched successfully"
    )
  );
});

export const getDataByCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;   // this id is categoryId
  console.log("getDataByCategory :: Category ID from URL: ", id);

  const category = await Category.findById(id).lean();
  
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const categoryType = category.type;
  console.log("getDataByCategory :: Fetched Category:", category.type); // ✅ debug

  let data = null;

  if (categoryType === "contact") {
     data = await User.find({ category: id })
    .select("-password -refreshToken")
    .lean();
  }else if (categoryType === "Books") {
     data = await Book.find({ category: id })
    .lean();
  } else {
    throw new ApiError(400, "Invalid category type");
  }

  console.log("getDataByCategory :: Fetched Data:", data); // ✅ debug

  if (!data || data.length === 0) {
    throw new ApiError(404, "No contacts found for this category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { data }, "Data fetched successfully")
    );
});




