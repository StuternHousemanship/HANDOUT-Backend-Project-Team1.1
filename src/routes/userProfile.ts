import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth";
import {
  CurrentUser,
  editUser,
  editUserPassword,
} from "../Controllers/ProfileController/profile";

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: user profile _id
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
 *         location:
 *           type: string
 *           description: user location
 *       User:
 *         type: object
 *         properties:
 *            id:
 *              type: integer
 *              format: int64
 *              example: 10
 *            firstName:
 *              type: integer
 *              format: int64
 *              example: 10
 *            lastName:
 *              type: integer
 *              format: int64
 *              example: 10
 *            mobile:
 *              type: integer
 *              format: int64
 *              example: 10
 *            location:
 *              type: integer
 *              format: int64
 *              example: 10
 */

router.get("/getSingleUser/:id", verifyToken, CurrentUser);
/**
 * @swagger
 * /getSingleUser/{id}:
 *    get:
 *        description: This API is for getting user Profile
 *        tags: 
 *          - user
 *        summary: find user by ID
 *        operationID: getUserById
 *        parameters:
 *           - name: userId
 *             in: path
 *             description: ID of user
 *             required: true
 *             schema:
 *               type: integer
 *               format: int64
 *           - name: X-access-token
 *             in: header
 *             description: an authorization header
 *             required: true
 *             schema:
 *              type: string
 *        responses:
 *           '200':
 *              description: Successful
 *              content:
 *                application/json:
 *                   schema:
 *                     type: object
 *           '400':
 *              description: Error
 */
router.patch("/updateUser", verifyToken, editUser);
/**
 * @swagger
 * /updateUser:
 *    patch:
 *        description: This API is for updating user Profile
 *        tags: 
 *          - user
 *        summary: update user password by ID
 *        operationID: getUserById
 *        parameters:
 *           - name: userId
 *             in: path
 *             description: ID of user
 *             required: true
 *             schema:
 *               type: integer
 *               format: int64
 *           - name: X-access-token
 *             in: header
 *             description: an authorization header
 *             required: false
 *             schema:
 *              type: string
 *        consumes:
 *        - application/json
 *        produces:
 *        - application/json
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/editUserProfile'
 *        responses:
 *           200:
 *              description: user profile updated
 *           400:
 *              description: Error
 * definitions:
 *     editUserProfile:
 *        type: object
 *        required:
 *        - firstName
 *        - lastName
 *        - email
 *        - mobile
 *        - password
 *        - location
 *        properties:
 *            firstName:
 *                    type: string
 *                    example: mavel
 *            lastName:
 *                    type: string
 *                    example: stone
 *            email:
 *                    type: string
 *                    example: rite@gmail.com
 *            mobile:
 *                    type: string
 *                    example: 99999923
 *            password:
 *                    type: string
 *                    example: test123
 *            location:
 *                    type: string
 *                    example: my city
 */
router.patch("/updateUserPassword", verifyToken, editUserPassword);
/**
 * @swagger
 * /updateUserPassword:
 *    patch:
 *        description: This API is for update users password
 *        tags: []
 *        operationID:
 *        parameters:
 *           - name: userId
 *             in: path
 *             description: ID of user
 *             required: true
 *             schema:
 *               type: integer
 *               format: int64
 *           - name: X-access-token
 *             in: header
 *             description: an authorization header
 *             required: false
 *             schema:
 *              type: string
 *        consumes:
 *        - application/json
 *        produces:
 *        - application/json
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/userProfile'
 *        responses:
 *           201:
 *              description: Success! Password Updated
 *           400:
 *              description: Error
 * definitions:
 *     userProfile:
 *        type: object
 *        required:
 *        - oldPassword
 *        - newPassword
 *        properties:
 *            oldPassword:
 *                    type: string
 *                    example: test12
 *            newPassword:
 *                    type: string
 *                    example: test1234
 */
router.patch("/updateUserPassword", verifyToken, editUserPassword);

export default router;
