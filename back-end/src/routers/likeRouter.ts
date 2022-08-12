import { Router } from "express";
import { validateToken } from "../middlewares/validationMiddleware.js";
import { likeController } from "../controllers/likeController.js";

const likeRouter = Router();

likeRouter.use(validateToken);

likeRouter.post("/:postId", likeController.likePost);
likeRouter.delete("/:postId", likeController.dislikePost);

export default likeRouter;
