import { Application } from "express";
import {
    authenticate,
    create,
    verifyUserEmail,
    resetPass,
    forgotPass
} from "../Controllers/Auth/authController";

export const authRoute = (app: Application) => {
    app.post("/auth/signup", create);
    app.post("/auth/resetpassword", resetPass);
    app.post("/auth/confirm", verifyUserEmail);
    app.post("/auth/login", authenticate);
    app.post("/auth/forgotpassword", forgotPass);
};

export default authRoute;
