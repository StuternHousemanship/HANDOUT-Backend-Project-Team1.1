import { Application } from "express";
import {
    authenticate,
    create,
    logout,
    verifyUserEmail,
} from "../Controllers/Auth/authController";

export const authRoute = (app: Application) => {
    app.post("/auth/signup", create);
    app.post("/auth/confirm", verifyUserEmail);
    app.post("/auth/login", authenticate);
    app.get('/auth/logout', logout)


};

export default authRoute;

