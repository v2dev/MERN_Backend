import mongoose, { Schema } from "mongoose";

const contactsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		location: {
			type: String,
			trim: true,
		},
		mobile1: {
			type: String,
			trim: true,
		},
		mobile2: {
			type: String,
			trim: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category', // must match model name in category.models.js
			required: false, // make true if every user must belong to a category
		},
	},
	{
		timestamps: true,
	},
);

export const Contact = mongoose.model('Contact', contactsSchema);
