import { Request, Response } from "express";
import { ItemType } from "../../interfaces/itemType";
import {
  createItemService,
  getItemsService,
} from "../../services/ItemService/item";

export const createItem = (req: Request, res: Response) => {
  const { user } = req.user;

  const newItem: ItemType = {
    name: req.body.name,
    price: req.body.price,
    location: req.body.location,
    category: req.body.category,
    status: req.body.status,
    userId: user._id,
  };

  createItemService(newItem)
    .then(() => {
      res.status(200).json({ message: "New item created", newItem });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

export const getAllItems = async (req: Request, res: Response) => {
  await getItemsService()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
