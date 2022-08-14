import { Request, Response } from "express";
import { likeService } from "../services/likeService.js";

async function likePost(req: Request, res: Response) {
  const postId = +req.params.postId;
  const userId = res.locals.user.id;

  await likeService.likePost({ postId, userId });
  res.sendStatus(200);
}

async function dislikePost(req: Request, res: Response) {
  const postId = +req.params.postId;
  const userId = res.locals.user.id;

  await likeService.dislikePost({ postId, userId });
  res.sendStatus(200);
}

export const likeController = {
  likePost,
  dislikePost,
};
