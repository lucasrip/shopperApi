import {NextFunction,Request,Response} from 'express'
import apiError from "../utils/apiError";

export default function errorHandler(
  error:apiError,
  request: Request,
  response:Response,
  next: NextFunction
)
{
 const statusCode = error.status ?? 500;
 console.log("errorHandler",error);

 response.status(statusCode).json({...error});
}