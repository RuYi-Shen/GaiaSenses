import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import * as userRepository from "../repositories/userRepository.js";

export async function validateEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  const user = await userRepository.findByEmail(email);
  if (user) {
    return res.status(401).send("Email already in use");
  }
  res.locals.user = user;
  next();
}

export async function validatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res.status(401).send("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).send("Invalid password");
  }
  res.locals.user = user;
  next();
}
