import cron from "node-cron";
import sql from "../db.js";

cron.schedule("*/15 * * * *", async () => {
  try {
    console.log("Inicio del CRON JOB - 'deleteUnverifiedUsers'");
    const result = await sql` 
        DELETE FROM users
          WHERE verified = FALSE
        AND 
          created_on < NOW() - INTERVAL '1 hour';`;

    console.log(`Se elimino usuarios no verificados.`);
  } catch (error) {
    console.log(
      "Ocurrió un error al intentar borrar los usuarios inactivos.",
      error
    );
  }
});
