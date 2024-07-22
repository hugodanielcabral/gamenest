import sql from "../db.js";
import { encryptPassword, comparePassword } from "../helpers/handleBcrypt.js";
import { handleJwt } from "../helpers/handleJwt.js";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { emailTemplate, tokenValidation } from "../utils/email.js";
const resend = new Resend(process.env.RESEND_API_KEY);

export const signup = async (req, res) => {
  const { username, email, password, country_id } = req.body;

  try {
    const userExists = await sql`SELECT * FROM users WHERE username LIKE ${
      username + "%"
    } OR email LIKE ${email + "%"}`;

    if (userExists[0])
      return res.status(400).json({ message: "User already exist" });

    const encryptedPassword = await encryptPassword(password);

    const verificationToken = uuidv4();

    const newUser =
      await sql`INSERT INTO users (username, email, password, country_id) VALUES (${username}, ${email}, ${encryptedPassword}, ${parseInt(
        country_id
      )}) RETURNING *`;

    await sql`INSERT INTO verification_tokens (user_id, email, token, created_on, used) VALUES (${newUser[0].user_id}, ${email},${verificationToken}, current_timestamp, FALSE)`;

    const token = await handleJwt({ email, verificationToken }, "1d");

    const { data, error } = await resend.emails.send(
      emailTemplate(username, token, email)
    );

    if (error) {
      return console.error({ error });
    }

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkUserExistence =
      await sql`SELECT * FROM users WHERE username = ${username}`;

    if (!checkUserExistence[0])
      return res.status(404).json({ message: "User not found" });

    const passwordComparison = await comparePassword(
      password,
      checkUserExistence[0].password
    );

    if (!passwordComparison)
      return res.status(401).json({ message: "Wrong password" });

    const token = await handleJwt({ id: checkUserExistence[0].user_id });

    res.cookie("token", token, {
      /*       httpOnly: true,
       */ sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ username, avatar: checkUserExistence[0].avatar });
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
    const checkUserExists =
      await sql`SELECT a.username, a.email, a.birthday, a.avatar, a.title, a.active, b."name" AS country, a.user_edit_credits FROM users a 
      INNER JOIN country b
      ON a.country_id = b.country_id
      WHERE user_id = ${req.user_id};`;

    if (!checkUserExists[0])
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(checkUserExists[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyUser = async (req, res) => {
  const { token } = req.params;

  /*   const decodedToken = await tokenValidation(token);

  if (!decodedToken) return res.status(401).json({ message: "Invalid token" }); */

  const decodedToken = await tokenValidation(token);
  const { email, verificationToken } = decodedToken;

  try {
    /* const verifyUserExistence =
      await sql`SELECT * FROM users WHERE email = ${email}`; */

    /* const verifyTokenExistence =
      await sql`SELECT * FROM verification_tokens WHERE token = ${verificationToken} AND used = FALSE`; */

    /* if (!verifyUserExistence[0] || !verifyTokenExistence[0])
      return res.status(404).json({ message: "Invalid Token" }); */

    const updateUserVerificationStatus =
      await sql`UPDATE users SET verified = true WHERE email = ${email}`;

    const updateVerificationTokens =
      await sql`UPDATE verification_tokens SET used = true WHERE token = ${verificationToken} AND email = ${email}`;

    return res
      .status(200)
      .json({ message: "El email fue validado correctamente." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const checkIfUserExists =
      await sql`SELECT * FROM users WHERE username = ${username}`;

    if (!checkIfUserExists[0]) throw new Error("No se encontró el usuario.");

    const userRecord = await sql`UPDATE users SET ${sql(
      req.body
    )} WHERE username = ${username} RETURNING *`;

    if (!userRecord[0])
      throw new Error(
        "Ocurrió un error al intentar actualizar el perfil del usuario."
      );

    const updatedUserProfile =
      await sql`SELECT a.username, a.email, a.birthday, a.avatar, a.title, a.active, b."name" AS country, user_edit_credits FROM users a 
      INNER JOIN country b
      ON a.country_id = b.country_id
      WHERE username = ${username};`;

    res.status(200).json(updatedUserProfile[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
