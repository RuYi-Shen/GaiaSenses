import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";
import jwt from "jsonwebtoken";

export async function createUser() {
  const user = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  await supertest(app).post("/auth/signup").send(user);
  const key = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
  await supertest(app).get(`/auth/activate?key=${key}`);
  const { body } = await supertest(app)
    .post("/auth/signin")
    .send({ email: user.email, password: user.password });
  return body.token;
}
