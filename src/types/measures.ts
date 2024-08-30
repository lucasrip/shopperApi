export interface Iupload
{
  datetime: Date,
  customerCode: string,
  type: "WATER" | "GAS"
  image: "base64",
  value?:number,
}

export interface Iconfirm
{
 uuid: string,
 confirmedValue: number
}

export type listType ={
  type: "WATER" | "GAS",
  customerCode:string
}