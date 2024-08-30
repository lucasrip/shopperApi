import express, { Request, Response } from 'express';
import measuresController from '../controllers/measures';
import uploadImage from '../middlewares/uploadImage';

const routes = express.Router();

routes.get("/hello",(request:Request,response:Response)=>response.json("container started"))

routes.post("/upload",uploadImage,measuresController.upload);
routes.patch("/confirm",measuresController.confirm);
routes.get("/:costumerCode/list",measuresController.list);

routes.delete('/deleteAll', measuresController.deleteAll);
routes.get('/showAll/',measuresController.showAll );



export default routes;