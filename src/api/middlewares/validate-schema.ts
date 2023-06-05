import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      res.status(400).json({ error: message });
    } else {
      next();
    }
  };
}
