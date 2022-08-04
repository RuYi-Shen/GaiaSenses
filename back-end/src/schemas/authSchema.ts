import Joi from "joi";
import { User } from "@prisma/client";

export const createUserInfo = Joi.object<User>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const createSessionInfo = Joi.object<User>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
