export const emailTemplate = (username, token) => {
  return {
    from: "onboarding@resend.dev",
    to: ["danicabral15@outlook.com"],
    subject: `Hola, ${username}! por favor verifica tu cuenta`,
    html: `
    <h1 style="font-size: 24px; color: #333;">Hola, ${username}!</h1>
    <p style="font-size: 16px; color: #666;">
      Bienvenido a GamNest, tu Gaming Backlog personal. Para empezar a disfrutar de todas las funcionalidades de la plataforma, por favor verifica tu cuenta haciendo click en el siguiente enlace.
    </p>
    <a href="http://localhost:5173/user/validate/${token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verificar cuenta</a>
    <p style="font-size: 14px; color: #999;">
      Recuerda que el enlace solo durará una hora. Luego tendrás que volver a registrarte.
    </p>
      `,
  };
};
