import { Request } from 'express';
import { Ifile } from '../types/imageFile';
import ApiError from './apiError';

export default async function filesVirefy(
  request: Request,
) {
  const multerError = request.body.multerError;
  const files = request?.files as Ifile[];
 
  if (!files?.length) {
    throw new ApiError(
      400,
      'é necessario que se envie pelo menos uma imagem'
    );
  }

  if(files.length > 1)
  {
    throw new ApiError(
      400,
      'é permitido apenas uma imagem'
    );
  }

  if (multerError) {
    throw new ApiError(400, multerError);
  }

}
