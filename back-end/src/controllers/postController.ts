import { Request, Response } from "express";
import { postService } from "../services/postService.js";
import { likeService } from "../services/likeService.js";

async function createPost(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const { content, url } = req.body;

  await postService.createPost({ content, url, userId });
  res.sendStatus(201);
}

async function getPosts(req: Request, res: Response) {
  const posts = await postService.getBestPosts();
  res.json(posts);
}

async function getNewPosts(req: Request, res: Response) {
  const posts = await postService.getNewPosts();
  res.json(posts);
}

async function getUserPosts(req: Request, res: Response) {
  const userId = res.locals.user.id;

  const posts = await postService.getUserPosts(userId);
  res.json(posts);
}

async function getLikedPosts(req: Request, res: Response) {
  const userId = res.locals.user.id;

  const posts = await postService.getLikedPosts(userId);
  res.json(posts);
}

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

export const postController = {
  createPost,
  getPosts,
  getNewPosts,
  getUserPosts,
  getLikedPosts,
  likePost,
  dislikePost,
};
