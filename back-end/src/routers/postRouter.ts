import multer from "multer";
import { Router } from "express";
import { createPostInfo } from "../schemas/postSchema.js";
import { validateToken, validateSchema } from "../middlewares/validationMiddleware.js";
import { postController } from "../controllers/postController.js";

const upload = multer();
const postRouter = Router();

postRouter.use(validateToken);

/* postRouter.post("/aws", upload.array("file"), (req, res) => {
  const a = req.files;
  console.log({ a });
  res.send("ok");
}); */
postRouter.post("/", validateSchema(createPostInfo), postController.createPost);
postRouter.post("/publish/:postId", postController.publishPost);
postRouter.get("/", postController.getPosts);
postRouter.get("/new", postController.getNewPosts);
postRouter.get("/user", postController.getUserPosts);
postRouter.get("/like", postController.getLikedPosts);
postRouter.delete("/:postId", postController.deletePost);

export default postRouter;
