import { User } from '../../../models/user.models.js';

export class MongoUserRepository {
	async findByEmail(email) {
		return User.findOne({ email }).lean();
	}

	async findByEmailWithPassword(email) {
		return User.findOne({ email }).select('+password');
	}

	async findByEmailOrUsername(email, username) {
		return User.findOne({
			$or: [{ email }, { username }],
		}).lean();
	}

	async create(data) {
		const user = await User.create(data);
		return user.toObject();
	}

	async updateById(id, data) {
		return User.findByIdAndUpdate(id, data, { new: true }).lean();
	}
}
