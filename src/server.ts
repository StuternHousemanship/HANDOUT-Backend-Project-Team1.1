import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as dotenv from 'dotenv'
import database from "./config/database";
import { authRoute } from "./routes/authRoutes";

dotenv.config();


const app:Application = express();
const port:number | string = process.env.PORT || 3000;

database().catch((err) => console.error(err)); // trigger function to connect to database
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


authRoute(app);



app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to Housemanship Handout API!");
});
app.get("*", (req: Request, res: Response) => {
    res.status(400).send("This route does not exist");
});


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

export default app