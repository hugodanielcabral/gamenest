import sql from "../db.js";

export const signup = async (req, res) => {
  const { username, email, pass, avatar, title, status_lock, country } =
    req.body;

  try {
    const oldUser = await sql`SELECT * FROM users WHERE username LIKE ${
      username + "%"
    } OR email LIKE ${email + "%"}`;

    if (oldUser[0])
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });

    const newUser =
      await sql`INSERT INTO users (username, email, pass, avatar, title, status_lock, country) VALUES (${username}, ${email}, ${pass}, ${avatar}, ${title}, ${status_lock}, ${country}) RETURNING *`;

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { username, pass } = req.body;
  try {
    const user =
      await sql`SELECT * FROM users WHERE username = ${username} AND pass = ${pass}`;

    if (!user[0])
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      logged: true,
      message: "User found",
      user: user[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const signout = (req, res) => {
  res.sendStatus(200).json({
    success: true,
    logged: false,
    message: "User logged out",
  });
};

export const profile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await sql`SELECT * FROM users WHERE user_id = ${id}`;

    if (!user[0])
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      logged: true,
      message: "User found",
      user: user[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
