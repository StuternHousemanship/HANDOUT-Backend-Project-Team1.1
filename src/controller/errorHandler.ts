import { StatusCodes, getStatusCode  } from "http-status-codes"
import {Request, Response, NextFunction} from "express"
import { Error } from "mongoose"


// const errorHandlerMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
  
//   const defaultError = {
//     statusCode: getStatusCode(err.name) || StatusCodes.INTERNAL_SERVER_ERROR,
//     msg: err.message || 'Something went wrong, try again later',
//   }
//   if (err.name === 'ValidationError') {
//     defaultError.statusCode = StatusCodes.BAD_REQUEST
//     defaultError.msg = Object.values(err.message)
//       .map((item:any) => item.message)
//       .join(',')
//   }
  

//   res.status(defaultError.statusCode).json({ msg: defaultError.msg })
// }
const errorHandlerMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
  let customError = {
    // set default
    statusCode: getStatusCode(err.name)  || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.name)
      .map((item) => item)
      .join(',')
    customError.statusCode = 400
  }
  if (err.name && err.name === "11000") {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.name
    )} field, please choose another value`
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.name}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}
export default errorHandlerMiddleware

