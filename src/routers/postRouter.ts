import { Router } from "express";
import { createPostInfo } from "../schemas/postSchema.js";
import { validateSchema, validateToken } from "../middlewares/validationMiddleware.js";
import { validateEmail , validatePassword } from "../middlewares/authMiddleware.js";
import { postController } from "../controllers/postController.js";

const postRouter = Router();
postRouter.get("/", validateSchema(createPostInfo), validateEmail, postController.getPosts);

export default postRouter;
