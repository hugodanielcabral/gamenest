import sql from "../db.js";
import { encryptPassword, comparePassword } from "../helpers/handleBcrypt.js";
import { handleJwt } from "../helpers/handleJwt.js";

export const signup = async (req, res) => {
  const {
    username,
    email,
    pass,
    birthday,
    avatar,
    title,
    status_lock,
    verified,
    role_id,
    country_id,
  } = req.body;

  console.log(req.body);

  try {
    const userExists = await sql`SELECT * FROM users WHERE username LIKE ${
      username + "%"
    } OR email LIKE ${email + "%"}`;

    if (userExists[0])
      return res.status(400).json({ message: "User already exist" });

    const hashedPass = await encryptPassword(pass);

    const newUser =
      await sql`INSERT INTO users (username, email, pass, birthday, avatar, title, status_lock, verified, country_id) VALUES (${username}, ${email}, ${hashedPass}, ${birthday}, ${avatar}, ${title}, ${status_lock}, ${true}, ${country_id}) RETURNING *`;

    const token = await handleJwt({ id: newUser[0].user_id });

    /* res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    }); */

    res.status(201).json({
      message: "User created",
      user_id: newUser[0].user_id,
      username: newUser[0].username,
      email: newUser[0].email,
      avatar: newUser[0].avatar,
      title: newUser[0].title,
      status_lock: newUser[0].status_lock,
      country_id: newUser[0].country_id,
      created_on: newUser[0].created_on,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { username, pass } = req.body;

  try {
    const userExists =
      await sql`SELECT * FROM users WHERE username = ${username}`;

    if (!userExists[0])
      return res.status(404).json({ message: "User not found" });

    const match = await comparePassword(pass, userExists[0].pass);

    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = await handleJwt({ id: userExists[0].user_id });

    res.cookie("token", token, {
      /*       httpOnly: true,
       */ sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "User found",
      user_id: userExists[0].user_id,
      username: userExists[0].username,
      email: userExists[0].email,
      birthday: userExists[0].birthday,
      avatar: userExists[0].avatar,
      title: userExists[0].title,
      status_lock: userExists[0].status_lock,
      verified: userExists[0].verified,
      country: userExists[0].country,
      created_on: userExists[0].created_on,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userExists =
      await sql`SELECT * FROM users WHERE user_id = ${req.user_id}`;

    if (!userExists[0])
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User found",
      user: userExists[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
