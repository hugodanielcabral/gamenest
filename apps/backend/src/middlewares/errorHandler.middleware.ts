import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
  });

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message
      }
    });
    return;
  }

  res.status(500).json({
    error: {
      message: "Error interno del servidor"
    }
  });
};