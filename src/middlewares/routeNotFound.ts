import {Request,Response} from 'express';

export default function routeNotFound(request:Request,response:Response)
{
  response.status(404).send({
    message:`Request path ${request.path} not found`,
  });
};