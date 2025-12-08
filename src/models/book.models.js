import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
    },
    genre: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model("Book", bookSchema);
