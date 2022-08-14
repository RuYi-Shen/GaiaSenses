import { faker } from "@faker-js/faker";
import app from "../../src/app.js";
import supertest from "supertest";
import { prisma } from "../../src/database.js";
import jwt from "jsonwebtoken";
import { resetDatabase } from "../factories/databaseFactory";

beforeEach(async () => {
  await resetDatabase();
});

describe("authentication", () => {
  it("should return 201 when register valid new user", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const response = await supertest(app).post("/auth/signup").send(user);
    expect(response.status).toBe(201);
    const userFromDb = await prisma.user.findUnique({
      where: { email: user.email },
    });
    expect(userFromDb).toBeDefined();
  });
  it("should return 401 when register using repeated email", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await supertest(app).post("/auth/signup").send(user);

    const response = await supertest(app).post("/auth/signup").send(user);
    expect(response.status).toBe(401);
  });
  it("should return 422 when login with invalid format credentials", async () => {
    const invalidUser = {
      email: faker.internet.email(),
    };

    const response = await supertest(app)
      .post("/auth/signin")
      .send(invalidUser);
    expect(response.status).toBe(422);
  });
  it("should return 404 when login with not registered credentials", async () => {
    const invalidUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await supertest(app)
      .post("/auth/signin")
      .send(invalidUser);
    expect(response.status).toBe(404);
  });
  it("should return 401 when login with not activated account", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await supertest(app).post("/auth/signup").send(user);

    const response = await supertest(app)
      .post("/auth/signin")
      .send({ email: user.email, password: user.password });
    expect(response.status).toBe(401);
  });
  it("should return 404 when activate with invalid key", async () => {
    const email = faker.internet.email();
    const key = jwt.sign({ email }, process.env.SECRET_KEY);

    const response = await supertest(app).get("/auth/activate").query({ key });
    expect(response.status).toBe(404);
  });
  it("should return 401 when trying activate already activated account", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await supertest(app).post("/auth/signup").send(user);

    const key = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

    const response1 = await supertest(app).get("/auth/activate").query({ key });
    expect(response1.status).toBe(200);
    const response2 = await supertest(app).get("/auth/activate").query({ key });
    expect(response2.status).toBe(401);
  });
  it("should return 200/401 with token after activate account with correct/wrong password", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await supertest(app).post("/auth/signup").send(user);

    const key = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

    const response1 = await supertest(app).get("/auth/activate").query({ key });
    expect(response1.status).toBe(200);

    const userFromDb = await prisma.user.findUnique({
      where: { email: user.email },
    });
    expect(userFromDb.activated).toBe(true);

    const response2 = await supertest(app)
      .post("/auth/signin")
      .send({ email: user.email, password: user.password });
    expect(response2.status).toBe(200);
    expect(response2.body.token).toBeDefined();

    const response3 = await supertest(app)
      .post("/auth/signin")
      .send({ email: user.email, password: faker.internet.password() });
    expect(response3.status).toBe(401);
    expect(response3.body.token).toBeUndefined();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
