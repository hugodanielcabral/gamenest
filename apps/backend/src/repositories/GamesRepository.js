import env from "dotenv";
env.config();

export const GamesRepository = {
  async get(body, url = "games") {
    const headers = {
      "Client-ID": process.env.CLIENT_ID,
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };

    try {
      const response = await fetch(`https://api.igdb.com/v4/${url}`, {
        method: "POST",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in GamesRepository:", error.message);
      throw error;
    }
  },
};
