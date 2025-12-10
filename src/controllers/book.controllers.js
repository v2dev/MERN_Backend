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

export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;   // ✅ get id from URL
  console.log("Book ID from URL:", id); // ✅ debug

  const book = await Book.findById(id)
    .lean();

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { book }, "Book fetched successfully")
    );
});

export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log("Book ID from URL:", id);

  // Delete the book from the database
  const book = await Book.findByIdAndDelete(id).lean();

  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { book }, "Book deleted successfully")
    );
});




