import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const emailTemplate = (username, token, email) => {
  return {
    from: process.env.EMAIL_USER,
    to: [email],
    subject: `Hola, ${username}! por favor verifica tu cuenta`,
    html: `
    <h1 style="font-size: 24px; color: #333;">Hola, ${username}!</h1>
    <p style="font-size: 16px; color: #666;">
      Bienvenido a GameNest, tu Gaming Backlog personal. Para empezar a disfrutar de todas las funcionalidades de la plataforma, por favor verifica tu cuenta haciendo click en el siguiente enlace.
    </p>
    <a href="${process.env.FRONTEND_URL}/user/validate/${token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verificar cuenta</a>
    <p style="font-size: 14px; color: #999;">
      Recuerda que el enlace solo durará una hora. Luego tendrás que volver a registrarte.
    </p>
      `,
  };
};

export const tokenValidation = async (token) => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return null;
        }
        return decoded;
      }
    );

    return decodedToken;
  } catch (error) {
    console.log(error);
  }
};
