import Joi from "joi";
import { Post } from "@prisma/client";

export const createPostInfo = Joi.object<Post>({
  content: Joi.string().required(),
  url: Joi.string().uri().required(),
});
