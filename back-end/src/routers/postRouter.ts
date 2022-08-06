import { Router } from "express";

import { createPostInfo } from "../schemas/postSchema.js";
import {
  validateToken,
  validateSchema,
} from "../middlewares/validationMiddleware.js";
import { postController } from "../controllers/postController.js";

const postRouter = Router();

postRouter.use(validateToken);

postRouter.post("/", validateSchema(createPostInfo), postController.createPost);
postRouter.get("/", postController.getPosts);
postRouter.get("/new", postController.getNewPosts);
postRouter.get("/user", postController.getUserPosts);
postRouter.get("/liked", postController.getLikedPosts);
postRouter.post("/like/:postId", postController.likePost);
postRouter.delete("/like/:postId", postController.dislikePost);

export default postRouter;
