import * as postRepository from "../repositories/postRepository.js";

import { Post } from "@prisma/client";

export async function createPost(testInfo: Post) {
  return await postRepository.create(testInfo);
}
