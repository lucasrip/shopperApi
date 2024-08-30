import { Iconfirm, Iupload, listType } from "../../types/measures";

const db = require('../../database');

class measures
{
 async create(register:Iupload){
  const { datetime ,customerCode,value,type,image} = register;

  const [row] = await db.query(`INSERT INTO measures(datetime,customer_code,value,type,image_url)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING image_url ,value AS measure_value,uuid AS measure_uuid
  `,[datetime ,customerCode,value,type,image])

  return row
 }

 async update(register:Iconfirm){
  
  return ''
 }

 async showAll(query:listType){
   
//   formato
//    measure_uuid: string,
//  measure_datetime: datetime,
//  measure_type: string,
//  has_confirmed:boolean,
//  image_url: string
  return ''
 }

}

export default new measures()