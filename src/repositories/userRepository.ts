import { prisma } from "../database.js";
import { User } from "@prisma/client";

export type UserRegister = Omit<User, "id" | "avatar" | "activated">;

async function findById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function create(userInfo: UserRegister) {
  return await prisma.user.create({
    data: userInfo,
  });
}

async function activate(id: number) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      activated: true,
    },
  });
}

export const userRepository = {
  findById,
  findByEmail,
  create,
  activate,
};
