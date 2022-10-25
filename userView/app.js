const express = require('express');
const app = express();

const dotenv= require('dotenv')
dotenv.config();
const morgan = require('morgan')

const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


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