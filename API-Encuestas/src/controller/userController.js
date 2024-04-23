import userService from "../service/userService.js";

class UserController {
    constructor() {}

    async getUsers(req, res) {
        const users = await userService.getUsers();
        res.status(200).json(users);
    }
}

export default new UserController;