import { Router } from "express";
import { createUserInfo, createSessionInfo } from "../schemas/authSchema.js";
import { validateEmail , validatePassword, validateKey } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validationMiddleware.js";
import { authController } from "../controllers/authController.js";

const authRouter = Router();
authRouter.post("/signup", validateSchema(createUserInfo), validateEmail, authController.createUser);
authRouter.post("/signin", validateSchema(createSessionInfo), validatePassword, authController.createSession);
authRouter.get("/activate", validateKey, authController.activateAccount);

export default authRouter;
