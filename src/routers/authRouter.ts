import { Router } from "express";
import { createUserInfo, createSessionInfo } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/validationMiddleware.js";
import { validateEmail , validatePassword } from "../middlewares/authMiddleware.js";
import { authController } from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/signup", validateSchema(createUserInfo), validateEmail, authController.createUser);
authRouter.post("/signin", validateSchema(createSessionInfo), validatePassword, authController.createSession);

export default authRouter;
