import { prisma } from "../database.js";
import { Post } from "@prisma/client";

export type PostContent = Omit<Post, "id" | "published" | "createdAt">;

async function create(postInfo: PostContent) {
  return await prisma.post.create({
    data: postInfo,
  });
}

async function publish(postId: number) {
  return await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
}

async function findById(id: number) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

async function findAll() {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

async function findLastWeek() {
  return await prisma.post.findMany({
    where: {
      published: true,
      createdAt: {
        gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      },
    },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: { Like: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function findUser(userId: number) {
  return await prisma.post.findMany({
    take: 10,
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function findLiked(userId: number) {
  return await prisma.like.findMany({
    take: 10,
    where: { userId },
    include: {
      post: {
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
    orderBy: { id: "desc" },
  });
}

async function deleteById(id: number) {
  return await prisma.post.deleteMany({
    where: { id }
  });
}

export const postRepository = {
  create,
  publish,
  findById,
  findAll,
  findLastWeek,
  findUser,
  findLiked,
  deleteById,
};
