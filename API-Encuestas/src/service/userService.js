import User from "../model/user.js";

class UserService {
    constructor() {}

    async getUsers() {
        return await User.findAll();
    }
}

export default new UserService;