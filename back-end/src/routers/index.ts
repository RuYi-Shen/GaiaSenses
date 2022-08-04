import { Router } from "express";
import authRouter from "./authRouter.js";
import postRouter from "./postRouter.js";

const router = Router();
router.use(authRouter);
router.use("/auth", authRouter);
router.use("/post", postRouter);

export default router;
