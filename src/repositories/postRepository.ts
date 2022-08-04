import { prisma } from "../database.js";
import { Post } from "@prisma/client";

export async function create(postInfo: Post) {
  return await prisma.post.create({
    data: postInfo,
  });
}

export async function findById(id: number) {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
}

export async function deleteById(id: number) {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
}
