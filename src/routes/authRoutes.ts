import { Application } from "express";
import {
    authenticate,
    create,
    verifyUserEmail,
    resetpassword,
    forgotPassword
} from "../Controllers/Auth/authController";

export const authRoute = (app: Application) => {
    app.post("/auth/signup", create);
    app.post("/auth/resetpassword", resetpassword);
    app.post("/auth/confirm", verifyUserEmail);
    app.post("/auth/login", authenticate);
    app.post("/auth/forgotpassword", forgotPassword);
};

export default authRoute;
