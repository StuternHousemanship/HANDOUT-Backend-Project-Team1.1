import express from "express";

import { uploadImage } from "../Controllers/imageController/image";
import { verifyToken } from "../middleware/auth";
import { uploadImg } from "../middleware/upload";
const imageRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: file
 *       required:
 *         - image
 *       properties:
 *         image:
 *           type: string
 *           description: item image
 *       example:
 *         image: file
 */

  /**
   * @swagger
   * /upload:
   *    post:
   *        description: This API is for uploading an image
   *        tags: [Upload]
   *        consumes:
   *          - multipart/form-data
   *        produces:
   *        - application/json
   *        requestBody:
   *          content:
   *            multipart/form-data:
   *              schema:
   *                $ref: '#/definitions/newImage'
   *        responses:
   *           200:
   *              description: Item created
   *           400:
   *              description: Error
   * definitions:
   *     newImage:
   *        type: file
   *        required:
   *        - image
   *        properties:
   *            image:  
   *                    type: string
   *                    format: binary
   */
   imageRouter.post("/upload", verifyToken, uploadImg, uploadImage);

export default imageRouter;
