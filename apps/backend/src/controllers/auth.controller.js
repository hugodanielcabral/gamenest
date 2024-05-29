import sql from "../db.js";
import { encryptPassword, comparePassword } from "../helpers/handleBcrypt.js";
import { handleJwt } from "../helpers/handleJwt.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, pass, country } = req.body;

  try {
    const userExists = await sql`SELECT * FROM users WHERE username LIKE ${
      username + "%"
    } OR email LIKE ${email + "%"}`;

    if (userExists[0])
      return res.status(400).json({ message: "User already exist" });

    const title = "Newbie";
    const status_lock = false;
    const verified = false;
    const birthday = null;
    const avatar = "https://via.placeholder.com/300x300?text=No+Avatar";
    const role_id = 3;
    const hashedPass = await encryptPassword(pass);
    const verificationToken = uuidv4();

    const newUser =
      await sql`INSERT INTO users (username, email, pass, birthday, avatar, title, status_lock, verified, role_id, country_id, verificationToken) VALUES (${username}, ${email}, ${hashedPass}, ${birthday}, ${avatar}, ${title}, ${status_lock}, ${verified}, ${role_id}, ${country}, ${verificationToken}) RETURNING *`;

    const token = await handleJwt({ email, verificationToken });
    //! Enviar por email el token
    console.log(token);

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
      avatar: userExists[0].avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { token } = req.params;

  const decode = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return decoded;
  });

  const { email, verificationToken } = decode;

  try {
    const userExists =
      await sql`SELECT * FROM users WHERE email = ${email} AND verificationToken = ${verificationToken}`;

    if (!userExists[0])
      return res.status(404).json({ message: "Invalid Token" });

    await sql`UPDATE users SET verified = true, verificationToken = null WHERE email = ${email} AND verificationToken = ${verificationToken}`;

    res.status(200).json({ message: "User verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
