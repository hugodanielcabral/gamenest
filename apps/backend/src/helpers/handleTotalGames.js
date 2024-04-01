import sql from "../db.js";

const validatePage = async (page) => {
  return page > 0 ? page : 1;
};

export const getTotalGames = async (req, query, validatedStatus) => {
  const { page } = query;
  try {
    const validatedPage = await validatePage(page);

    const totalGames = await sql`
  SELECT COUNT(*) FROM collection WHERE user_id = ${req.user_id} 
  ${
    validatedStatus.length > 0
      ? sql`AND status = ANY(${sql.array(validatedStatus)})`
      : sql``
  }
`;

    const totalPage = Math.ceil(totalGames[0].count / 2);

    if (validatedPage > totalPage)
      return res.status(404).json({ message: "Page not found" });

    return {
      totalPage,
      validatedPage,
    };
  } catch (error) {
    console.log(error);
  }
};
