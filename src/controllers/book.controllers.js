import { Book } from "../models/book.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

export const createBook = async (req, res) => {
  try {
    // console.log("REQ BODY:", req.body); // ✅ debug
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBooks = asyncHandler(async (req, res) => {

    //To fetch all fields 
    const lists = await Book.find()
    .lean();

    if (!res.status(200)) {
        throw new ApiError(404, "No Books found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, { lists: lists }, "Books data fetched successfully"));
});



