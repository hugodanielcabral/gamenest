import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const sql = postgres(process.env.CONNECTION_URL);

console.log(sql);

export default sql;
