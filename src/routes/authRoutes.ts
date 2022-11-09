import { Application } from "express";
import {
  authenticate,
  create,
  verifyUserEmail,
  logout,
  forgotPassword,
} from "../Controllers/Auth/authController";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - mobile
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: user first name
 *         lastName:
 *           type: string
 *           description: user last name
 *         email:
 *           type: string
 *           description: the user's email
 *         mobile:
 *           type: string
 *           description: user phone number
 *         password:
 *           type: string
 *           description: user password
 *       example:
 *         firstName: Sadiq
 *         lastName: Sambo
 *         email: sadiqasg@gmail.com
 *         mobile: 09012345678
 *         password: mypassword
 */

export const authRoute = (app: Application) => {
  /**
   * @swagger
   * /auth/signup:
   *    post:
   *        description: This API is for creating a new user
   *        tags: [Auth]
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/newUserCredentials'
   *        responses:
   *           201:
   *              description: Email verified
   *           400:
   *              description: Error
   * definitions:
   *     newUserCredentials:
   *        type: object
   *        required:
   *        - firstName
   *        - lastName
   *        - email
   *        - mobile
   *        - password
   *        properties:
   *            firstName:
   *                    type: string
   *                    example: Sadiq
   *            lastName:
   *                    type: string
   *                    example: Sambo
   *            email:
   *                    type: string
   *                    example: sadiqasg@gmail.com
   *            mobile:
   *                    type: string
   *                    example: 09012345678
   *            password:
   *                    type: string
   *                    example: Pass1234#
   */
  app.post("/auth/signup", create);

  /**
   * @swagger
   * /auth/confirm:
   *    post:
   *        description: This API is for verifying user email
   *        tags: [Auth]
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/verifyCredentials'
   *        responses:
   *           201:
   *              description: Email verified
   *           400:
   *              description: Error
   * definitions:
   *     verifyCredentials:
   *        type: object
   *        required:
   *        - verificationCode
   *        properties:
   *            verificationCode:
   *                    type: string
   *                    example: abc123
   */
  app.post("/auth/confirm", verifyUserEmail);

  /**
   * @swagger
   * /auth/login:
   *    post:
   *        description: This API is for authenticate users by typing email and password
   *        tags: [Auth]
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/userCredentials'
   *        responses:
   *           201:
   *              description: Login successful
   *           400:
   *              description: Error
   * definitions:
   *     userCredentials:
   *        type: object
   *        required:
   *        - email
   *        - password
   *        properties:
   *            email:
   *                    type: string
   *                    example: sadiqasg@gmail.com
   *            password:
   *                    type: string
   *                    example: Pass1234#
   */
  app.post("/auth/login", authenticate);
   /**
   * @swagger
   * /auth/forgotpassword:
   *    post:
   *        description: This API is for sending a user email for forgotpassword
   *        tags: [Auth]
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/definitions/mailCredentials'
   *        responses:
   *           201:
   *              description: Password reset mail has been sent
   *           400:
   *              description: Error
   * definitions:
   *     mailCredentials:
   *        type: object
   *        required:
   *        - email
   *        properties:
   *           email:
   *                    type: string
   *                    example: azunna.onugha@gmail.com
   */

  app.post("/auth/forgotpassword", forgotPassword);
    /**
   * @swagger
   * /auth/logout:
   *    get:
   *        description: This API is for Logging out the user
   *        tags: [Auth]
   *        content:
   *            application/json:
   *              schema:
   *                type: Object
   *        responses:
   *           201:
   *              description: Logged out successfully
   *           400:
   *              description: Error
   */
  app.get("/auth/logout", logout);
};

export default authRoute;
