import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		avatar: {
			type: {
				url: String,
				localPath: String,
			},
			default: {
				url: 'https://placehold.co/200x200',
				localPath: '',
			},
		},

		username: {
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

		fullName: {
			type: String,
			trim: true,
		},

		password: {
			type: String,
			required: true,
			select: false, // ✅ security best practice
		},

		isEmailVerified: {
			type: Boolean,
			default: false,
		},

		refreshToken: {
			type: String,
			select: false,
		},

		forgotPasswordToken: String,
		forgotPasswordExpiry: Date,

		emailVerificationToken: String,
		emailVerificationExpiry: Date,

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},
	},
	{ timestamps: true },
);

export const User = mongoose.model('User', userSchema);
