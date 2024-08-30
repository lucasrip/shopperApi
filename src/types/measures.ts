export interface Iupload
{
  date: Date,
  customerCode: string,
  type: "WATER" | "GAS"
  value?:number,
  uri?:string
}

export interface Iconfirm
{
 uuid: string,
 confirmedValue: number
}

export type queryParams = {
  measure_type?:"WATER" | "GAS" | "",
  limit?:number,
  offset?:number,
  order?:string,

}
export type routeParams = {costumerCode:string}

export type listType = routeParams & queryParams

