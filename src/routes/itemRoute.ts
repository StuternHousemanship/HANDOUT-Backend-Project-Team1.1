import express from "express";

import { createItem, getAllItems, PaginatedItems,getSingleItem,updatedItem, deletedItem } from "../Controllers/ItemController/item";
import checkPermissions from "../middleware/checkPermission"
const itemRouter = express.Router();
import {paginatedLists} from "../middleware/paginated"
import { verifyToken } from "../middleware/auth";
import { uploadImg } from "../middleware/upload";

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


/**
 * @swagger
 * /item/pageItems:
 *   get:
 *     summary: Returns the list of items 
 *     description: Multiple item values provided with number of pages,total items and item name as keyword and sort Date added  Price Delivery options Location (City, state)
 *     operationId: pageItems
 *     tags: [Item]
 *     parameters:
 *       - name: tags
 *         in: query
 *         description: Tags to filter by
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
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
itemRouter.get("/item/pageItems", verifyToken, paginatedLists,PaginatedItems);
/**
 * @swagger
 * /item/oneItem/[id]:
 *    get:
 *        description: This API is for getting a single item properties 
 *        tags: 
 *          - [item]
 *        summary: get item by ID
 *        operationID: oneItem
 *        parameters:
 *           - name: itemId
 *             in: path
 *             description: ID of the Item
 *             required: true
 *             schema:
 *               type: integer
 *               format: int64
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
itemRouter.get("/item/oneItem/:id", verifyToken, getSingleItem);

/**
 * @swagger
 * /item/editItem/[id]:
 *    put:
 *        description: This API is for updating an existing item properties with id 
 *        tags: 
 *          - [item]
 *        summary: update an existing item
 *        operationID: editItem
 *        parameters:
 *           - name: itemId
 *             in: path
 *             description: ID of the Item
 *             required: true
 *             schema:
 *               type: integer
 *               format: int64
 *        responses:
 *           '200':
 *              description: item updated Successfully
 *              content:
 *                application/json:
 *                   schema:
 *                     type: object
 *           '400':
 *              description: invalid item ID
 *           '404':
 *              description: item not found
 *           '405':
 *              description: Invalid token
 */
itemRouter.put("/item/editItem/:id", verifyToken, checkPermissions, updatedItem);

/**
 * @swagger
 * /item/deleteItem/[id]:
 *    delete:
 *        description: This API is for deleting an existing item properties with id 
 *        tags: 
 *          - [item]
 *        summary: delete an existing item
 *        operationID: deleteItem
 *        parameters:
 *           - name: itemId
 *             in: path
 *             description: ID of the Item
 *             required: true
 *             schema:
 *               type: integer
 *               format: int64
 *        responses:
 *           '200':
 *              description: item deleted Successfully
 *              content:
 *                application/json:
 *                   schema:
 *                     type: object
 *           '400':
 *              description: invalid item ID
 *           '404':
 *              description: item not found
 *           '405':
 *              description: Invalid token
 */
itemRouter.delete("/item/deleteItem/:id", verifyToken,checkPermissions, deletedItem);

export default itemRouter;

