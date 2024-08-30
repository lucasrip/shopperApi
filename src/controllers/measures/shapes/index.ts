import * as yup from 'yup';

export const uploadShape ={
 customerCode: yup.string().defined("o customer code deve ser uma string"),
 date: yup.date().required('a data é necessaria'),
 type: yup.string().oneOf(["WATER","GAS"],"o type deve ser WATER ou GAS"),
}

export const confirmShape =
{
 uuid: yup.string().required("é necessario um identificador de usuario que esta enviando a pesquisa"),
 confirmedValue: yup.number().integer("o valor deve ser um valor inteiro"),
}

export const listShape = {
  measure_type: yup.string().oneOf(["water","WATER","gas","GAS"]),
  customerCode:yup.string().min(10,"deve ser uma string de registro valido"),
}