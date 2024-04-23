import User from "../model/user.js";
import CustomError from "../helper/customError.js";

class UserService {
    constructor() {}

    async createUser(user) {
        try {
            const existingUser = await User.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new CustomError(400, 'User with this email already exists', 'USER_ALREADY_EXISTS', { email: user.email });
            }

            return await User.create(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'Error creating user', 'INTERNAL_ERROR', { originalError: error.message });
            }
        }
    }
}

export default new UserService();