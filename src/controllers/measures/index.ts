import { Request, Response,NextFunction } from "express";
import { Iconfirm, Iupload, listType } from "../../types/measures";
import filesVirefy from "../../utils/filesVirefy";
import validadeSchema from "../../utils/validadeSchema";
import { confirmShape, uploadShape } from "./shapes";

class measures
{
 async upload(request:Request,response:Response, next: NextFunction)
 {
  try {
    const body = request.body as Iupload;
     await filesVirefy(request);
    await validadeSchema(body,uploadShape);
    response.json("create");
  } catch (error) {
    next(error)
  }
 };

 async confirm(request:Request,response:Response, next: NextFunction)
 {
  try {
    const body = request.body as Iconfirm;
    await validadeSchema(body,confirmShape);

    response.json("update");
  } catch (error) {
    next(error)
  }
 };

 async list(request:Request,response:Response, next: NextFunction)
 {
  try {
    const body = request.body as listType;
    await validadeSchema(body,confirmShape);

    response.json("showAll");
  } catch (error) {
    next(error)
  }
 };
}

export default new measures();