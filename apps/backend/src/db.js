import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const sql = postgres(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default sql;
