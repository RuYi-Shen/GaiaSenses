import { Request, Response } from "express";
import { postService } from "../services/postService.js";

async function createPost(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const { content, url } = req.body;

  await postService.createPost({ content, url, userId });
  res.sendStatus(201);
}

async function publishPost(req: Request, res: Response) {
  const postId = +req.params.postId;
  const userId = res.locals.user.id;

  await postService.publishPost(postId, userId);
  res.sendStatus(200);
}

async function getPosts(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const posts = await postService.getBestPosts(userId);
  res.json(posts);
}

async function getNewPosts(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const posts = await postService.getNewPosts(userId);
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

async function deletePost(req: Request, res: Response) {
  const postId = +req.params.postId;
  const userId = res.locals.user.id;

  await postService.deletePost(postId, userId);
  res.sendStatus(200);
}

export const postController = {
  createPost,
  publishPost,
  getPosts,
  getNewPosts,
  getUserPosts,
  getLikedPosts,
  deletePost,
};
