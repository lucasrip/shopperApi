export default class ApiError extends Error {
  status: number;

  constructor(statusCode:number,message:string|object|object[])
  {
    super();
    this.status = statusCode ?? 500;
    this.message = message as string;
    Error.captureStackTrace(this,this.constructor);
  }
}