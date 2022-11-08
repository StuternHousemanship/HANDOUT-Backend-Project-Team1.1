import express from 'express'
const router = express.Router();
import {verifyToken} from "../middleware/auth"
import{
  CurrentUser,
 editUser,
editUserPassword
} from  '../Controllers/ProfileController/profile';

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - userId
 *         - firstName
 *         - lastName
 *         - email
 *         - mobile
 *         - password
 *         - location
 *       properties:
 *         userId:
 *           type: string
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
 *       example:
 *         _id: 6366c9495c3e726d87976f84
 *         firstName: marvel
 *         lastName: stone
 *         email: srite@gmail.com
 *         mobile: 99999923
 *         password: mypassword
 *         location: my city
 */


router.get('/getSingleUser/:id', verifyToken,  CurrentUser);
/**
     * @swagger
     * /getSingleUser/{id}:
     *    get:
     *        description: This API is for getting user Profile
     *        tags: []
     *        operationID: 
     *           - name: id
     *             in: path
     *             description: User ID
     *             required: true
     *             schema: 
     *              type: string
     *           - name: X-handout_token
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
     *                     $ref: 'components/schemas/Profile'
     *           400:
     *              description: Error
     *        components:
     *          schemas:
     *            Profile:
     *                type: object
     *                properties:
     *                   id:
     *                     type:string 
     *                   firstName:
     *                     type:string 
     *                   lastName:
     *                     type:string 
     *                   email:
     *                     type:string 
     *                   mobile:
     *                     type:string 
     *                   location:
     *                     type:string 
     */
router.patch('/updateUser', verifyToken, editUser);
/**
     * @swagger
     * /updateUser:
     *    patch:
     *        description: This API is for getting user Profile
     *        tags: []
     *        operationID: 
     *           - name: X-handout_token
     *             in: header
     *             description: an authorization header
     *             required: true
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
 router.patch('/updateUserPassword',verifyToken, editUserPassword);
/**
     * @swagger
     * /updateUserPassword:
     *    patch:
     *        description: This API is for update users password
     *        tags: []
     *        operationID: 
     *           - name: X-handout_token
     *             in: header
     *             description: an authorization header
     *             required: true
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


export default router;