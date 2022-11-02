import express, {Request, Response} from 'express';
const app = express();

import morgan from "morgan";
import cors from "cors";

import connectDB from "./db/connect"

//routers
import userRouter from './routes/user';

// middleware
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1', userRouter);


app.get("/api/v1", (req: Request, res: Response) => {
    res.status(200).send("Welcome to Housemanship API!");
});


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000
const start= async ()=>{
    try {
        await connectDB ()
        app.listen(port, () =>{
            console.log('Server listening on port ' + port);
        }) 
    } catch (error) {
       console.log(error); 
    }

}
start()



