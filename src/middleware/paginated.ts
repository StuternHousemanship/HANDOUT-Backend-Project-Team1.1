import {Request, NextFunction,  Response } from "express";
import { StatusCodes } from "http-status-codes";
import Item from "../models/itemModel";
import { ItemType } from "../interfaces/itemType";


export const paginatedLists = async ( req: Request, res: Response, next: NextFunction) => {
    const  {name } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 25;
    const skip = (page - 1) * limit;
    const keyWord = {name};
    if (name) {
      keyWord.name = { $regex: name, $options: 'i' };
    }

  let result = Item.find(keyWord).sort("price createdAt");
  result = result.skip(skip).limit(limit);

  const items = await result;

  const totalItems = await Item.countDocuments();
  const numOfPages = Math.ceil(totalItems / limit);

  res.json({ items, totalItems, numOfPages });
  next()
};
