import { Request, Response } from "express";
import * as testService from "../services/postService.js";

export async function getPosts(req: Request, res: Response) {

  res.sendStatus(201);
}

export const postController = {
  getPosts,
};