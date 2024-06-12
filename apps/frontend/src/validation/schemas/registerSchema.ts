import { z } from "zod";

export const registerSchema = {
  username: z.string().min(6, {
    message: "El nombre de usuario debe tener al menos 6 caracteres",
  }),
  email: z.string().email({ message: "El email no es válido" }),
};
