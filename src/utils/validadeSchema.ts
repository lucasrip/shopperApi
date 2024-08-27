import * as yup from 'yup';
import { IvalidadeSchemaBody } from '../types/validadeSchemaBody';
import ApiError from './apiError';

export default async function validateSchema(body:IvalidadeSchemaBody,shape:yup.ObjectShape){

  const validadeResult = await yup.object().shape(shape).validate(body,{
    abortEarly:false,
  })
  .catch((err) => {
    return err.inner.map((erro:yup.ValidationError) =>{
     return {
      field: erro.path,
      message:erro.errors[0],
     };
    });
  });

   if (validadeResult.length) {
    throw new ApiError(400, validadeResult);
  }
  
  return body;
}