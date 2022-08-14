import app from "../../src/app.js";
import supertest from "supertest";
import { prisma } from "../../src/database.js";
import jwt from "jsonwebtoken";
import { createUser } from "../factories/userFactory";
import { createPost } from "../factories/postFactory";
import { resetDatabase } from "../factories/databaseFactory";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await resetDatabase();
});

describe("post posts", () => {
  it("should return 201 when create post with valid parameters", async () => {
    const post = {
      content: faker.lorem.paragraph(),
      url: faker.internet.url(),
    };
    const token = await createUser();

    const response = await supertest(app)
      .post("/post")
      .set("Authorization", `Bearer ${token}`)
      .send(post);
    expect(response.status).toBe(201);
    const postFromDb = await prisma.post.findFirst({
      where: {
        content: post.content,
      },
    });
    expect(postFromDb).toBeDefined();
  });
  it("should return 200 when publish valid post", async () => {
    const token = await createUser();
    const postId = await createPost(token);

    const response = await supertest(app)
      .post(`/post/publish/${postId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    const postFromDb = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    expect(postFromDb.published).toBe(true);
  });
});

describe("get posts", () => {
  it("should return 401/500 when absence/invalid token", async () => {
    let token = faker.random.alphaNumeric(10);

    const response1 = await supertest(app).get("/post");
    expect(response1.status).toBe(401);
    const response2 = await supertest(app)
      .get("/post")
      .set("Authorization", `Bearer ${token}`);
    expect(response2.status).toBe(500);

    const userId = 0;
    token = jwt.sign({ userId }, process.env.SECRET_KEY);
    const response3 = await supertest(app)
      .get("/post")
      .set("Authorization", `Bearer ${token}`);
    expect(response3.status).toBe(401);
  });
  it("should return 200 with list of best weekly posts", async () => {
    const token = await createUser();
    await createPost(token);

    const response = await supertest(app)
      .get("/post")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  it("should return 200 with list of newest posts", async () => {
    const token = await createUser();
    await createPost(token);

    const response = await supertest(app)
      .get("/post/new")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  it("should return 200 with list of user posts", async () => {
    const token = await createUser();
    await createPost(token);
    const { userId }: any = jwt.verify(token, process.env.SECRET_KEY);

    const response = await supertest(app)
      .get("/post/user")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    response.body.forEach((post: any) => {
      expect(post.userId).toBe(userId);
    });
  });
  it("should return 200 with list of liked posts", async () => {
    const token = await createUser();
    await createPost(token);

    const response = await supertest(app)
      .get("/post/like")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    response.body.forEach((post: any) => {
      expect(post.liked).toBe(true);
    });
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
