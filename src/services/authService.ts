import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailUtils } from "../utils/emailUtils.js";
import { UserRegister, userRepository } from "../repositories/userRepository.js";

async function createUser(userInfo: UserRegister) {
  userInfo.password = await bcrypt.hash(userInfo.password, 10);
  return await userRepository.create(userInfo);
}

function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY);

  return token;
}

async function sendConfirmationEmail(email: string) {
  const key = jwt.sign({ email }, process.env.SECRET_KEY);
  return await emailUtils.sendEmail(email, key);
}

async function activateAccount(userId: number) {
  return await userRepository.activate(userId);
}

export const authService = {
  createUser,
  createSession,
  activateAccount,
  sendConfirmationEmail,
};
