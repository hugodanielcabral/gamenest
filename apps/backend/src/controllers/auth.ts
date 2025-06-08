import { Request, Response } from "express";
import { BcryptEncryptionAdapter } from "../adapters/encryption.js";
import { JwtAdapter } from "../adapters/jwt.adapter.js";
import type { AuthRequest } from "../middlewares/auth.js";
import Token from "../models/Token.js";
import User from "../models/User.js";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, country_id } = req.body;

  try {
    const foundUser = await User.findByEmail(email);
    console.log(foundUser);

    if (foundUser) {
      res.status(400).json({ error: "El usuario ya existe." });
      return;
    }

    const encryption = new BcryptEncryptionAdapter(10);
    const encryptedPassword = await encryption.encrypt(password);

    const newUser = await User.create(
      username,
      email,
      encryptedPassword,
      country_id
    );

    if (!newUser) {
      res.status(500).json({ error: "No se pudo crear un nuevo usuario." });
      return;
    }
    await Token.create("", Date.now(), newUser.user_id);

    res.status(201).json({ message: "Usuario creado exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findByUsername(username);

    if (!foundUser) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    const encryption = new BcryptEncryptionAdapter();

    const isPasswordValid = await encryption.compare(
      password,
      foundUser.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ error: "Contraseña incorrecta." });
      return;
    }

    const JWT = new JwtAdapter();
    const accessToken = await JWT.generateToken(
      { user_id: foundUser.user_id },
      process.env.ACCESS_TOKEN_SEED,
      "10m"
    );

    const refreshToken = await JWT.generateToken(
      { user_id: foundUser.user_id },
      process.env.REFRESH_TOKEN_SEED,
      "2d"
    );

    if (!accessToken || !refreshToken) {
      res.status(500).json({ error: "No se logro generar un nuevo token." });
      return;
    }

    const expireDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    await Token.update(refreshToken, expireDate, foundUser.user_id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: expireDate.getTime() - Date.now(),
      expires: expireDate,
    });

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user_id: foundUser.user_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const signout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.sendStatus(200);
};

export const profile = async (req: AuthRequest, res: Response) => {
  try {
    const foundUser = await User.findById(req.user_id);

    if (!foundUser) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    res.status(200).json({ user_id: foundUser.user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    const JWT = new JwtAdapter();
    const payload = await JWT.validateToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SEED
    );

    if (!payload) {
      res.status(401).json({ error: "No se proveyó ningún token." });
      return;
    }

    const storedRefreshToken = await Token.findById(
      payload.user_id,
      refreshToken
    );

    if (
      !storedRefreshToken ||
      storedRefreshToken.user_id !== parseInt(payload.user_id) ||
      new Date(storedRefreshToken.expire_date) < new Date()
    ) {
      res.status(401).json({
        error: "Refresh token invalido.",
      });

      return;
    }

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

    if (!newAccessToken || !newRefreshToken) {
      res.status(500).json({ error: "No se logró generar un token." });
      return;
    }

    const expireDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    await Token.update(newRefreshToken, expireDate, payload.user_id);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: expireDate.getTime() - Date.now(),
      expires: expireDate,
    });

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user_id: payload.user_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
