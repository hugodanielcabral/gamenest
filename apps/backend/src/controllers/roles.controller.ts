import { Request, Response } from "express";
import Roles from "../models/roles.model";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Roles.findAll();

    if (!roles) {
      res.status(404).json({ error: "No se encontró ningún rol." });
      return;
    }

    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const role = await Roles.findById(id);

    if (!role) {
      res.status(404).json({ error: "Rol no encontrado." });
      return;
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newRole = await Roles.create(name);

    res.status(201).json(newRole);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedRole = await Roles.update(id, name);

    if (!updatedRole) {
      res.status(404).json({ error: "Rol no encontrado." });
      return;
    }

    res.status(200).json(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedRole = await Roles.delete(id);

    if (!deletedRole) {
      res.status(404).json({ error: "Rol no encontrado." });
      return;
    }

    res.status(200).json(deletedRole);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
