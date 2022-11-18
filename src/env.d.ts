import UserType from "./interfaces/userType";
import ItemType from "./interfaces/itemType"
declare global {
  namespace Express {
    interface Request {
      item: ItemType;
      user: UserType;
      userId?: Record<string, any>;
      lastName?: Record<string, any>;
      location?: Record<string, any>;
      firstName?: Record<string, any>;
      mobile?: Record<number>;
    }
  }
}

export {};
