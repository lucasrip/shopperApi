import * as yup from 'yup';

export const uploadShape ={
 customerCode: yup.string().defined("o customer code deve ser uma string"),
 datetime: yup.date().defined("o measure datetime deve ser uma data valida"),
 type: yup.string().oneOf(["WATER","GAS"]),
}

export const confirmShape =
{
 uuid: yup.string(),
//  confirmedValue: yup.integer()
 confirmedValue: yup.number()
}

export const listShape = {
  measureType: yup.string().oneOf(["WATER","GAS"]),
  customerCode:yup.string(),
}