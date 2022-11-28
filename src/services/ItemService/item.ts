import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../../errors";
import { ItemType } from "../../interfaces/itemType";
import { ItemRepository } from "../../repository/ItemRepository/item";

new ItemRepository();


export const createItemService = async (newItem: ItemType) => {
  await new ItemRepository()
    .createItem(newItem)
    .then((item) => {
      return item;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};


export const getPaginatedItems =async (req: Request, res: Response) => {
  
  const items = await new ItemRepository().AllItemLists();
  
  return items
}


export const getItemById = async (req:Request, res:Response) => {
  
  const item = await new ItemRepository().SingleItem(req.params.id)
  if (item) {
    return item
  } else {
    res.status(404)
    throw new BadRequestError('Item not found')
  }
}

export const updateItem = async (req:any, res:Response) => {
  const { name,price, description, image,location,category,status,shippingOptions } = req.body
  
  if (!req.body ){
    throw new BadRequestError("Field(s) must not be empty")
  }

  const item = await new ItemRepository().editItem (req.params.id)

  if (item) {
    item.image = image
    item.name = name
    item.price = price
    item.description = description
    item.image = image
    item.location = location
    item.category = category
    item.status = status
    item.shippingOptions = shippingOptions
    const updatedProduct = await item.save()
    res.json(updatedProduct)
  } 
 else {
    res.status(404)
    throw new NotFoundError(' Item not available')
  }

}

export const deleteItem = async (req:Request, res:Response) => {
  const item = await new ItemRepository().deleteItem(req.params.id)
  if (!item) {
    throw new NotFoundError(`No item with id :${req.params.id}`);
  }

  if (item) {
    await item.remove()
  } else {
    res.status(404)
    throw new NotFoundError('Item not found')
  }
}

export const getItemsService = async () => {
  const items = await new ItemRepository().getAllItems();
  return items;
};
