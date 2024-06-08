import sql from "../db.js";

export const getProfileStats = async (req, res) => {
  try {
    const userProfileStats = await sql`
        SELECT status_name, COUNT(status_name) AS total FROM collection 
          WHERE user_id = ${req.user_id}
            GROUP BY status_name;`;

    res.status(200).json(userProfileStats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
