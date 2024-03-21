import sql from "../db.js";

export const getCountries = async (req, res) => {
  try {
    const countries = await sql`SELECT * FROM country`;

    res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await sql`SELECT * FROM country WHERE country_id = ${id}`;

    if (!country[0])
      return res.status(404).json({ error: "Country not found" });

    res.status(200).json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const createCountry = async (req, res) => {
  const { country_name, country_domain } = req.body;
  try {
    const newCountry =
      await sql`INSERT INTO country (country_name, country_domain) VALUES (${country_name}, ${country_domain}) RETURNING *`;

    res.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { country_name, country_domain } = req.body;
  try {
    const updatedCountry =
      await sql`UPDATE country SET country_name = ${country_name}, country_domain = ${country_domain} WHERE country_id = ${id} RETURNING *`;

    if (!updatedCountry[0])
      return res.status(404).json({ error: "Country not found" });

    res.status(200).json({
      success: true,
      updatedCountry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCountry =
      await sql`DELETE FROM country WHERE country_id = ${id} RETURNING *`;

    if (!deletedCountry[0])
      return res.status(404).json({ error: "Country not found" });

    res.status(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
