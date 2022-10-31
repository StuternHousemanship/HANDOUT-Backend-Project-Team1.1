import express, {Request, Response} from 'express';
const app = express();

import morgan from "morgan";


import connectDB from "./db/connect"

//routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// middleware
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';


app.use(morgan('tiny'))
app.use(express.json())

app.use( '/api/v1', authRouter);
app.use('/api/v1', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000
const start= async ()=>{
    try {
        await connectDB (process.env.MONGO_URL)
        app.listen(port, () =>{
            console.log('Server listening on port ' + port);
        }) 
    } catch (error) {
       console.log(error); 
    }

}
start()



