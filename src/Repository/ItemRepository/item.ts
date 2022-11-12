import { ItemType } from "../../interfaces/itemType";
import Item from "../../models/itemModel";

export class ItemRepository {
  public async createItem(item: ItemType) {
    const newItem = new Item(item);
    await newItem
      .save()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
  public async AllItemLists(): Promise<any> {
    let result =  Item.find({});
    
  }
  public async SingleItem(itemId: any): Promise<any> {
    const item = await Item.findById(itemId)
    return item
  }
 
  public async editItem(itemId: any): Promise<any> {
    const item = await Item.findById(itemId)
    return item
  }

  public async deleteItem(Id: any): Promise<any> {
    const item= await Item.findById(Id)
    return item;
  }
}

  public async getAllItems() {
    await Item.find({}).then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  }


