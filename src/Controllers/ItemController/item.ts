import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ItemType } from "../../interfaces/itemType";
import { createItemService,getItemsService, getPaginatedItems, getItemById, updateItem,deleteItem } from "../../services/ItemService/item";


export const createItem = (req: Request, res: Response) => {
  const { user } = req.user;


    const newItem: ItemType = {
      name: req.body.name,
      price: req.body.price,
      location: req.body.location,
      category: req.body.category,
      status: req.body.status,
      description: req.body.description,
      shippingOptions: req.body.shippingOptions,
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

export const PaginatedItems = async (req: Request, res: Response) => {
   const items = await getPaginatedItems(req, res);
   res.status(StatusCodes.OK);
  };

  export const getSingleItem = async (req: Request, res: Response) => {
   const item = await getItemById(req, res);
    res.status(StatusCodes.OK).json({ item});
  };

  export const updatedItem = async (req: Request, res: Response) => {
    await updateItem(req, res);
    res.status(StatusCodes.OK);
  };
  export const deletedItem = async (req: Request, res: Response) => {
    await deleteItem(req, res);
    res.status(StatusCodes.OK).json({ message: 'Item deleted' })
  };
