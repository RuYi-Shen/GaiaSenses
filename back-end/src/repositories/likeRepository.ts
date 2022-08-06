import { prisma } from "../database.js";
import { Like } from "@prisma/client";

export type LikeContent = Omit<Like, "id">;

async function create(likeInfo: LikeContent) {
  return await prisma.like.create({
    data: likeInfo,
  });
}

async function deleteById(likeInfo: LikeContent) {
  const { userId, postId } = likeInfo;

  return await prisma.like.deleteMany({
    where: {
      AND: [{ userId }, { postId }],
    },
  });
}

async function getById(likeInfo: LikeContent) {
  const { userId, postId } = likeInfo;

  return await prisma.like.findFirst({
    where: {
      AND: [{ userId }, { postId }],
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function getByPost(likeInfo: LikeContent) {
  const { userId, postId } = likeInfo;

  return await prisma.like.findMany({
    where: {
      postId,
      NOT: {
        userId,
      },
    },
    select: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    take: 2,
  });
}

async function countByPost(postId: number) {
  return await prisma.like.count({
    where: {
      postId,
    },
  });
}

export const likeRepository = {
  create,
  deleteById,
  getById,
  getByPost,
  countByPost,
};
