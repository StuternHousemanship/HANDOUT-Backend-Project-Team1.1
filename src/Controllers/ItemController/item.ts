import { Request, Response } from "express";
import { ItemType } from "../../interfaces/itemType";
import { createItemService } from "../../services/ItemService/item";

export const createItem = (req: Request, res: Response) => {
    const imageFile = (req as any).files;

    const newItem: ItemType = {
        name: req.body.name,
        image: `items/${imageFile[0].filename}`,
        price: req.body.price,
        location: req.body.location,
        category: req.body.category,
        status: req.body.status,
    };

    createItemService(newItem)
        .then(() => {
            res.status(200).json({ message: "New item created", newItem });
        })
        .catch((error) => {
            res.status(400).json(error);
        });
};
