import { Request, Response } from "express";
import { authService } from "../services/authService.js";

async function createUser(req: Request, res: Response) {
  const userInfo = req.body;

  const sent = await authService.sendConfirmationEmail(userInfo.email);
  if (!sent) {
    return res.status(500).send("Error sending confirmation email");
  }
  await authService.createUser(userInfo);

  res.status(201).send("Account created successfully, please check your email");
}

function createSession(req: Request, res: Response) {
  const { user } = res.locals;

  const token = authService.createSession(user.id);
  res.json({ ...user, token });
}

async function activateAccount(req: Request, res: Response) {
  const { user } = res.locals;

  await authService.activateAccount(user.id);
  res
    .status(200)
    .send(
      `<p>Account activated successfully, please visit: <a href="https://gaia-senses.vercel.app/">GaiaSenses</a></p>`
    );
}

export const authController = {
  createUser,
  createSession,
  activateAccount,
};
