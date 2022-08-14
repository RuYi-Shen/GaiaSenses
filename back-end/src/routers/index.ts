import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postRouter.js";
import likeRouter from "./likeRouter.js";

const router = Router();
router.use(authRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/like", likeRouter);

export default router;
