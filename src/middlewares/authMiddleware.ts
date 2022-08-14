import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories/userRepository.js";

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
    return res.status(404).send("User not found");
  }
  if (!user.activated) {
    return res
      .status(401)
      .send("Account not activated, please check your email");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).send("Invalid password");
  }
  res.locals.user = user;
  next();
}

export async function validateKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = req.query.key.toString();

  const { email }: any = jwt.verify(key, process.env.SECRET_KEY);
  const user = await userRepository.findByEmail(email);
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (user.activated) {
    return res
      .status(401)
      .send(
        `<p>Account already activated, please visit: <a href="https://gaia-senses.vercel.app/">GaiaSenses</a></p>`
      );
  }
  res.locals.user = user;
  next();
}
