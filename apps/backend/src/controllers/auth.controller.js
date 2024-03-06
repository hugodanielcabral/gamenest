import sql from "../db.js";
import { encryptPassword, comparePassword } from "../helpers/handleBcrypt.js";
import { handleJwt } from "../helpers/handleJwt.js";

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

    const hashedPass = await encryptPassword(pass);

    const newUser =
      await sql`INSERT INTO users (username, email, pass, avatar, title, status_lock, country) VALUES (${username}, ${email}, ${hashedPass}, ${avatar}, ${title}, ${status_lock}, ${country}) RETURNING *`;

    const token = await handleJwt({ id: newUser[0].user_id });

    /* res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }); */

    res.status(201).json({
      success: true,
      message: "User created",
      user_id: newUser[0].user_id,
      username: newUser[0].username,
      email: newUser[0].email,
      avatar: newUser[0].avatar,
      title: newUser[0].title,
      status_lock: newUser[0].status_lock,
      country: newUser[0].country,
      created_on: newUser[0].created_on,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { username, pass } = req.body;
  try {
    const user = await sql`SELECT * FROM users WHERE username = ${username}`;

    if (!user[0])
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const match = await comparePassword(pass, user[0].pass);

    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });

    const token = await handleJwt({ id: user[0].user_id });

    res.cookie("token", token, {
      /*       httpOnly: true,
       */ sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "User found",
      user_id: user[0].user_id,
      username: user[0].username,
      email: user[0].email,
      avatar: user[0].avatar,
      title: user[0].title,
      status_lock: user[0].status_lock,
      country: user[0].country,
      created_on: user[0].created_on,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const user = await sql`SELECT * FROM users WHERE user_id = ${req.user_id}`;

    if (!user[0])
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      message: "User found",
      user: user[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
