import { Request, Response } from "express";
import Country from "../models/Country";

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await Country.findAll();

    if (!countries) {
      res.status(404).json({ error: "Países no encontrados." });
      return;
    }

    res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const country = await Country.findById(id);

    if (!country) {
      res.status(404).json({ error: "País no encontrado." });
      return;
    }

    res.status(200).json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createCountry = async (req: Request, res: Response) => {
  const { name, domain } = req.body;
  try {
    const newCountry = await Country.create(name, domain);
    res.status(201).json(newCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, domain } = req.body;
  try {
    const updatedCountry = await Country.update(id, name, domain);

    if (!updatedCountry) {
      res.status(404).json({ error: "País no encontrado." });
      return;
    }

    res.status(200).json(updatedCountry);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCountry = await Country.delete(id);

    if (!deletedCountry) {
      res.status(404).json({ error: "País no encontrado." });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
