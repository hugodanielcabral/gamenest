import { encryption } from "../helpers/handleEncryption.js";
import { JWT } from "../helpers/handleJwt.js";
import { UserRepository } from "../repositories/UserRepository.js";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const signup = async (req, res) => {
  const { username, email, password, country_id } = req.body;

  try {
    const foundUser = await UserRepository.findUserByUsername(username);

    if (foundUser[0])
      return res.status(400).json({ error: "User already exists." });

    const encryptedPassword = await encryption.encrypt(password);

    const newUser = await UserRepository.create({
      username,
      email,
      encryptedPassword,
      country_id,
    });

    if (!newUser[0])
      return res.status(500).json({ error: "Unable to create an user." });

    await RefreshTokenRepository.create({
      refreshToken: "",
      expireDate: Date.now(),
      user_id: newUser[0].user_id,
    });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await UserRepository.findUserByUsername(username);

    if (!foundUser[0])
      return res.status(404).json({ error: "User not found." });

    const isPasswordValid = await encryption.compare(
      password,
      foundUser[0].password
    );

    if (!isPasswordValid)
      return res.status(401).json({ error: "Wrong password." });

    const accessToken = await JWT.generateToken(
      { user_id: foundUser[0].user_id },
      process.env.ACCESS_TOKEN_SEED,
      "10m"
    );

    const refreshToken = await JWT.generateToken(
      { user_id: foundUser[0].user_id },
      process.env.REFRESH_TOKEN_SEED,
      "2d"
    );

    if (!accessToken || !refreshToken)
      return res.status(500).json({ error: "Unable to generate token." });

    const expireDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    await RefreshTokenRepository.update({
      refreshToken: refreshToken,
      expireDate: expireDate,
      user_id: foundUser[0].user_id,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: expireDate,
      expires: expireDate,
    });

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user_id: foundUser[0].user_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const signout = (req, res) => {
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const foundUser = await UserRepository.findUserById(req.user_id);
    if (!foundUser[0]) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user_id: foundUser[0].user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    const payload = await JWT.validateToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SEED
    );

    if (!payload) return res.status(401).json({ error: "No token provided." });

    const storedRefreshToken = await RefreshTokenRepository.findOne(
      payload.user_id,
      refreshToken
    );

    if (
      !storedRefreshToken[0] ||
      storedRefreshToken[0].user_id !== payload.user_id ||
      new Date(storedRefreshToken[0].expire_date) < new Date()
    )
      return res.status(401).json({
        error: "Invalid refresh token",
      });

    const newAccessToken = await JWT.generateToken(
      { user_id: payload.user_id },
      process.env.ACCESS_TOKEN_SEED,
      "10m"
    );

    const newRefreshToken = await JWT.generateToken(
      { user_id: payload.user_id },
      process.env.REFRESH_TOKEN_SEED,
      "2d"
    );

    if (!newAccessToken || !newRefreshToken)
      return res.status(500).json({ error: "Unable to generate token." });

    const expireDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    await RefreshTokenRepository.update({
      refreshToken: newRefreshToken,
      expireDate: expireDate,
      user_id: payload.user_id,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: expireDate,
      expires: expireDate,
    });

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user_id: payload.user_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
