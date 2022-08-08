import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository.js";

export function validateSchema(schema: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error);
      res
        .status(422)
        .send(error.details.map((e: { message: String }) => e.message));
    }
  };
}

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const { id:userId }: any = jwt.verify(token, process.env.SECRET_KEY || "secret");
  if (!userId) {
    return res.sendStatus(401);
  }
  const user = await userRepository.findById(+userId);
  if (!user) {
    return res.sendStatus(401);
  }
  res.locals.user = user;
  next();
}
