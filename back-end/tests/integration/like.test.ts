import app from "../../src/app.js";
import supertest from "supertest";
import { prisma } from "../../src/database.js";
import jwt from "jsonwebtoken";
import { createUser } from "../factories/userFactory";
import { createPost } from "../factories/postFactory";
import { resetDatabase } from "../factories/databaseFactory";

beforeEach(async () => {
    await resetDatabase();
});

describe("likes management", () => {
  it("should return 200 when like with valid token", async () => {
    const token = await createUser();
    const postId = await createPost(token);
    const { userId }: any = jwt.verify(token, process.env.SECRET_KEY);

    const response = await supertest(app)
      .post(`/like/${postId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const likeFromDb = await prisma.like.findFirst({
      where: {
        AND: [{ userId }, { postId }],
      },
    });
    expect(likeFromDb).toBeDefined();
  });
  it("should return 200 when dislike with valid token", async () => {
    const token = await createUser();
    const postId = await createPost(token);
    const { userId }: any = jwt.verify(token, process.env.SECRET_KEY);

    const response = await supertest(app)
      .delete(`/like/${postId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const likeFromDb = await prisma.like.findFirst({
      where: {
        AND: [{ userId }, { postId }],
      },
    });
    expect(likeFromDb).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
