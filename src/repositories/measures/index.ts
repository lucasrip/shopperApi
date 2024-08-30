import { Iupload } from "../../types/measures";
import ApiError from "../../utils/apiError";

const db = require('../../database');

class measures
{
 async create(register:Iupload){
  const { date ,customerCode,value,type,uri} = register;

  const [row] = await db.query(`
  INSERT INTO measures(datetime,customer_code,value,type,image_url)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING image_url ,value AS measure_value,id AS measure_uuid
  `,[date ,customerCode,value,type,uri])

  return row
 }

 async virifyRegister(date:Date,type:string)
 {
   const [row] = await db.query(`
   SELECT type,datetime  
   FROM measures
   WHERE type = $2 AND TO_CHAR(AGE($1,datetime),' MM')::INTEGER = 0
   `,[date,type])
   

   if(row)
   {
   
    throw new ApiError(409,{
     error_code: "DOUBLE_REPORT",
     error_description: "Leitura do mês já realizada"
    })
   }

   return row
 }

 async find(uuid:string)
 {
   
  const [row] = await db.query(`
   SELECT id 
   FROM measures
   WHERE id::text = $1
  `,[uuid]);
   
  if(!row)
  {
    throw new ApiError(404,{message:"o codigo de measue que foi enviado não consta nos registros"})
  }

 }

async findBy(costumerCode:string,
    measureType:string = "",
    limit:number = 20,
    offset:number = 0,
    order:string = 'asc',
  )
{
  const direction = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
  
  const [countResult] = await db.query(`
  SELECT COUNT(*) FROM measures
  WHERE customer_code = $1 AND LOWER(type) = LOWER($2)
     `,[costumerCode,measureType]
  );

  if (countResult.count == 0) {
      throw new ApiError(404, { message: 'registro não encontrado' });
    }

  const rows = await db.query(`
  SELECT * FROM measures
  WHERE customer_code = $1 AND LOWER(type) = LOWER($2)
  ORDER BY id ${direction}
  LIMIT $3
  OFFSET $4

  `,[costumerCode,measureType,limit,offset]);
 


  return { count: countResult?.count, data: rows };

}
async findAll(
  costumerCode:string,
    limit:number = 20,
    offset:number = 0,
    order:string = 'asc',
  )
{
  const direction = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  
  const [countResult] = await db.query(`
  SELECT COUNT(*) FROM measures
  WHERE customer_code = $1
     `,[costumerCode]
  );

  if (countResult.count == 0) {
      throw new ApiError(404, { message: 'registro não encontrado' });
    }

  const rows = await db.query(`
  SELECT * FROM measures
  WHERE customer_code = $1 
  ORDER BY id ${direction}
  LIMIT $2
  OFFSET $3

  `,[costumerCode,limit,offset]);
 


  return { count: countResult?.count, data: rows };

}

 async hasConfirmed(uuid:string)
 {
   
  const [row] = await db.query(`
   SELECT id ,has_confirmed 
   FROM measures
   WHERE id::text = $1 AND has_confirmed = false
  `,[uuid]);
   
  if(!row)
  {
    throw new ApiError(409,{message:"o measure solicitado ja foi confirmado"})
  }

 }

 async confirmeMeasure( uuid: string,confirmedValue: number)
 {
   
  const [row] = await db.query(`
  UPDATE measures
  SET value = $1 , has_confirmed = true
  WHERE id::text = $2
  RETURNING *
  `,[confirmedValue,uuid]);
   
  return row

 }

async showAll() 
{
    const [count] = await db.query(`SELECT COUNT(*) FROM measures`);

    const rows = await db.query(`SELECT *  FROM measures`);

    return { count: count.count, data: rows };
}

async deleteAll()
{
    await db.query('DELETE FROM measures');
}
 

}

export default new measures()