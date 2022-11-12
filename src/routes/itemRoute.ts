import express from "express";

import { createItem,getTotalItems,getSingleItem,updatedItem, deletedItem } from "../Controllers/ItemController/item";
import checkPermissions from "../middleware/checkPermission"
const itemRouter = express.Router();
import {paginatedLists} from "../middleware/paginated"
import { createItem, getAllItems } from "../controllers/ItemController/item";
import { verifyToken } from "../middleware/auth";
import { uploadImg } from "../middleware/upload";
const itemRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - location
 *         - category
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: item name
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
 *         price: 1000
 *         location: somewhere safe
 *         category: books
 *         status: new
 */

  /**
   * @swagger
   * /item:
   *    post:
   *        summary: Creates a new item
   *        description: This API is for creating a new item
   *        tags: [Item]
   *        consumes:
   *        - application/json
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            application/json:
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
   *        - price
   *        - location
   *        - category
   *        - status
   *        properties:
   *            name:
   *                    type: string
   *                    example: Call of Duty
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
itemRouter.post("/item", verifyToken, uploadImg,checkPermissions, createItem);
itemRouter.get("/item/allItems", verifyToken, paginatedLists,getTotalItems);
itemRouter.get("/item/oneItem/:id", verifyToken, getSingleItem);
itemRouter.put("/item/editItem/:id", verifyToken, checkPermissions, updatedItem);
itemRouter.delete("/item/deleteItem/:id", verifyToken,checkPermissions, deletedItem);

/**
 * @swagger
 * /item:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
itemRouter.get("/item", verifyToken, getAllItems);

export default itemRouter;
