import express, {Request,Response} from 'express';

const routes = express.Router();

routes.post("/home",(request:Request,response:Response)=>{

  response.json("primeira rota");
})

export default routes;