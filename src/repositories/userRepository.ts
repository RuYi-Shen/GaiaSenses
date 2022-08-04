import { prisma } from "../database.js";
import { User } from "@prisma/client";

export async function findById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function create(userInfo: User) {
  return await prisma.user.create({
    data: userInfo,
  });
}
