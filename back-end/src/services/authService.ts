import * as userRepository from "../repositories/userRepository.js";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/emailUtils.js";

async function createUser(userInfo: User) {
  userInfo.password = await bcrypt.hash(userInfo.password, 10);
  return await userRepository.create(userInfo);
}

function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY);
  
  return token;
}

async function sendConfirmationEmail(email: string) {
  const key = jwt.sign({ email }, process.env.SECRET_KEY);
  return await sendEmail(email, key);
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