import express from "express";
import { createItem } from "../controllers/ItemController/item";
import { verifyToken } from "../middleware/auth";
const itemRouter = express.Router();
import { uploadImg } from "../middleware/upload";
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - price
 *         - location
 *         - category
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: item name
 *         image:
 *           type: string
 *           description: item image
 *         price:
 *           type: number
 *           description: item price
 *         location:
 *           type: number
 *           description: item location
 *         category:
 *           type: string
 *           description: item category either - books - film, tv & music - games - electronics & computers - phones & gadgets - home, garden, pets, DIY - toys, children & baby - clothing - shoes - accessories - jewelries - sports - outdoors - health - beauty - household items - automobile & parts - food - others
 *         status:
 *           type: string
 *           description: item status either - new, used less than 5 times, used more than 5 times, old, damaged
 *       example:
 *         name: item name
 *         image: file
 *         price: 1000
 *         location: somewhere safe
 *         category: books
 *         status: new
 */

  /**
   * @swagger
   * /item:
   *    post:
   *        description: This API is for creating a new item
   *        tags: [Item]
   *        consumes:
   *          - multipart/form-data
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            multipart/form-data:
   *              schema:
   *                $ref: '#/definitions/newItem'
   *        responses:
   *           200:
   *              description: Item created
   *           400:
   *              description: Error
   * definitions:
   *     newItem:
   *        type: object
   *        required:
   *        - name
   *        - image
   *        - price
   *        - location
   *        - category
   *        - status
   *        properties:
   *            name:
   *                    type: string
   *                    example: Call of Duty
   *            image:  
   *                    type: string
   *                    format: binary
   *            price:
   *                    type: number
   *                    example: 20000
   *            location:
   *                    type: string
   *                    example: Abuja
   *            category:
   *                    type: string
   *                    example: games
   *            status:
   *                    type: string
   *                    example: new
   */
itemRouter.post("/item", verifyToken, uploadImg, createItem);

export default itemRouter;
