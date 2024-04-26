import { Router } from "express";
import {
  validateUser,
  validateUserVerification,
} from "../validation/userValidator.js";

function createUserRoutes(userController) {
  const router = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     code:
 *                       type: string
 *                       example: "123456"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Internal Server Error"
 *                     code:
 *                       type: string
 *                       example: "INTERNAL_ERROR"
 *                     details:
 *                       type: object
 *                       properties:
 *                         originalError:
 *                           type: string
 *                           example: "Error message"
 */
router.post("/users", validateUser, userController.createUser);

  router.post(
    "/users/resend",
    validateUser,
    userController.resendVerificationCode
  );
  router.post(
    "/users/verify",
    validateUserVerification,
    userController.verifyUser
  );

  return router;
}

export default createUserRoutes;
