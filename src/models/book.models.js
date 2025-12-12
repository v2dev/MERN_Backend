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
		favorite: {
			type: Boolean,
			default: false,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category', // must match model name in category.models.js
			required: false, // make true if every user must belong to a category
		},
	},
	{ timestamps: true },
);

export const Book = mongoose.model("Book", bookSchema);
