import { Application } from "express";
import {
    authenticate,
    create,
    verifyUserEmail,
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
    app.post("/auth/signup", create);
    app.post("/auth/confirm", verifyUserEmail);

    /**
     * @swagger
     * /auth/login:
     *    post:
     *        description: This API for authenticate users by typing email and password
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
     *                    example: 1234
     */
    app.post("/auth/login", authenticate);
};

export default authRoute;
