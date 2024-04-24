import userService from "../service/userService.js";

class UserController {
  constructor() {}

  async createUser(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
