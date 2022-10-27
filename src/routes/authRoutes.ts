import { Application } from "express";
import { logout } from "../controllers/authcontroller";


export const authRoute  = (app: Application) => {
  app.get('/auth/logout', logout)
}

