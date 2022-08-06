import * as userRepository from "../repositories/userRepository.js";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createUser(userInfo: User) {
  userInfo.password = await bcrypt.hash(userInfo.password, 10);
  return await userRepository.create(userInfo);
}

function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY || "secret");

  return token;
}

export const authService = {
  createUser,
  createSession,
};