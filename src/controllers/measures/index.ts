import { Request, Response,NextFunction } from "express";
import { Ifile } from "../../types/imageFile";
import { Iconfirm, Iupload, queryParams, routeParams } from "../../types/measures";
import filesVirefy from "../../utils/filesVirefy";
import gemini from "../../utils/gemini";
import validadeSchema from "../../utils/validadeSchema";
import { confirmShape, listShape, uploadShape } from "./shapes";
import measuresRepositorie from '../../repositories/measures/index'
class measures
{
 async upload(request:Request,response:Response, next: NextFunction)
 {
  try {
    const body = request.body as Iupload;
  
    await filesVirefy(request);
    await validadeSchema(body,uploadShape);
    const files = request?.files as Ifile[];
    const {path,mimetype} = files[0];
    
    await measuresRepositorie.virifyRegister(body.date,body.type);
    
    const geminiResponse = await Promise.resolve(gemini.makeImageValidade(path,mimetype));
    const register ={
      ...body,
     ...geminiResponse
    }

    const measureRegistred = await  measuresRepositorie.create(register);
    response.status(200).json(measureRegistred);

  } catch (error) {
    next(error)
  }
 };

 async confirm(request:Request,response:Response, next: NextFunction)
 {
  try {
    const body = request.body as Iconfirm;
    await validadeSchema(body,confirmShape);
    await  measuresRepositorie.find(body.uuid);
    await  measuresRepositorie.hasConfirmed(body.uuid);

    const {uuid,confirmedValue} = body;
    const valueUpdated = await  measuresRepositorie.confirmeMeasure(uuid,confirmedValue);
    
    response.status(200).json(valueUpdated);
  } catch (error) {
    next(error)
  }
 };

 async list(request:Request,response:Response, next: NextFunction)
 {
  try {
    const queryParam = request.query as queryParams;
    const routeParam = request.params as routeParams;
    const paramsValues ={ ...queryParam,...routeParam}
    await validadeSchema(paramsValues,listShape);

    const {costumerCode,measure_type,limit,offset,order} = paramsValues;

    const searchedReasult = !measure_type? await measuresRepositorie.findAll(costumerCode,limit,offset,order)
    : await measuresRepositorie.findBy(costumerCode,measure_type,limit,offset,order);
    
    response.status(200).json(searchedReasult);
  } catch (error) {
    next(error)
  }
 };

 async showAll(request: Request, response: Response, next: NextFunction) {
    try {
      const project = await measuresRepositorie.showAll();
      response.status(200).send(project);
    } catch (error) {
      next(error);
    }
 }
  
 async deleteAll(request: Request, response: Response, next: NextFunction) {
    try {
      await measuresRepositorie.deleteAll();
      response.status(204).json('tabela limpa');
    } catch (error) {
      next(error);
    }
  }
}

export default new measures();