import { Request, Response } from "express";
import { authService } from "../services/authService.js";

async function createUser(req: Request, res: Response) {
  const userInfo = req.body;
  delete userInfo.confirmPassword;

  await authService.createUser(userInfo);
  res.sendStatus(201);
}

async function createSession(req: Request, res: Response) {
  const { user } = res.locals;

  const token = authService.createSession(user.id);
  res.json({ ...user, token });
}

export const authController = {
  createUser,
  createSession,
};
