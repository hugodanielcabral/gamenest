import cron from "node-cron";
import sql from "../db.js";

cron.schedule("0 10 * * *", async () => {
  try {
    console.log("Inicio del CRON JOB - 'restarUserEditCredits'");
    const result =
      await sql`UPDATE users SET user_edit_credits = 1 WHERE verified = TRUE;`;

    console.log(`Se restaron los creditos de edición de los usuarios.`);
  } catch (error) {
    console.log(
      "Ocurrió un error al intentar restar los creditos de edición de los usuarios.",
      error
    );
  }
});
