import { Application } from "express";
import { forgotpass  } from "../controllers/authController";

export const authRoute = (app: Application) => {
  app.post("/auth/forgotpasword", forgotpass);
  
};
