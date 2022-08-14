import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";
import { prisma } from "../../src/database.js";

export async function createPost(token: string) {
  const post = {
    content: faker.lorem.paragraph(),
    url: faker.internet.url(),
  };
  await supertest(app)
    .post("/post")
    .set("Authorization", `Bearer ${token}`)
    .send(post);
  const postFromDb = await prisma.post.findFirst({
    where: {
      content: post.content,
    },
  });
  return postFromDb.id;
}
