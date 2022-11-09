import UserType from "./interfaces/userType";

declare global {
  namespace Express {
    interface Request {
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
