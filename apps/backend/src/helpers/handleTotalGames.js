import sql from "../db.js";

const validatePage = async (page) => {
  try {
    return page > 0 ? page : 1;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalGames = async (req, query, validatedStatus) => {
  const { page } = query;
  try {
    const validatedPage = await validatePage(page);

    const totalGamesFilters = await sql`
  SELECT COUNT(*) FROM collection WHERE user_id = ${req.user_id} 
  ${
    validatedStatus.length > 0
      ? sql`AND status = ANY(${sql.array(validatedStatus)})`
      : sql``
  }
`;

    const totalGames = await sql`
    SELECT COUNT(*) FROM collection WHERE user_id = ${req.user_id}`;

    const totalPage = Math.ceil(totalGamesFilters[0].count / 20);

    return {
      totalPage,
      validatedPage,
      totalGames: parseInt(totalGames[0].count),
    };
  } catch (error) {
    console.log(error);
  }
};
