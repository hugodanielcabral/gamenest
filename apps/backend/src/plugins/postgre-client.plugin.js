import sql from "../db.js";

export const sqlQuery = async (query) => {
  try {
    const result = await sql`${query}`;
    return result;
  } catch (error) {
    return error;
  }
};
