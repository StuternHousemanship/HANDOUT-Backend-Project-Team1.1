import {Request, NextFunction,  Response } from "express";
import { StatusCodes } from "http-status-codes";
import Item from "../models/itemModel";


export const paginatedLists = async ( req: Request, res: Response, next: NextFunction) => {
    const { user } = req.user;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
  let result = Item.find();
  result = result.skip(skip).limit(limit);

  const items = await result;

  const totalItems = await Item.countDocuments();
  const numOfPages = Math.ceil(totalItems / limit);

  res.json({ items, totalItems, numOfPages });
  next()
};
