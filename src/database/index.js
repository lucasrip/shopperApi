import { Pool } from "pg";

require('dotenv').config();

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.DBPORT,
  user: process.env.USER, 
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

pool.connect();

exports.query = async(query,values) => {
  const {rows} = await pool.query(query,values);
  return rows;
}