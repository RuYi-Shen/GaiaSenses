import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import {
  insertSampleData,
  insertOne,
} from "./factories/recommendationsFactory.js";

beforeEach(async () => {
  await prisma.recommendation.deleteMany({});
});

describe("GET /recommendations", () => {
  it("should return 200 and last 10 recommendations", async () => {
    await insertSampleData(5);
    const firstTry = await supertest(app).get("/recommendations");
    expect(firstTry.status).toEqual(200);
    expect(firstTry.body.length).toBeLessThanOrEqual(5);

    await insertSampleData();
    const secondTry = await supertest(app).get("/recommendations");
    expect(secondTry.status).toEqual(200);
    expect(secondTry.body.length).toBeLessThanOrEqual(10);
  });

  it("given a video ID it should return 200", async () => {
    const id = await insertOne();
    const response = await supertest(app).get(`/recommendations/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(id);
  });

  it("given a invalid video ID it should return 404", async () => {
    const response = await supertest(app).get("/recommendations/0");
    expect(response.status).toEqual(404);
  });

  it("given the random parameter it should return 200", async () => {
    const response = await supertest(app).get("/recommendations/random");
    expect(response.status).toEqual(404);

    await insertSampleData();
    const response2 = await supertest(app).get("/recommendations/random");
    expect(response2.status).toEqual(200);
    expect(response2.body).toBeDefined();
  });

  it("given the top parameter it should return 200", async () => {
    await insertSampleData(10);
    const amount = Math.round(Math.random() * 20);
    const response = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeLessThanOrEqual(amount);
    for (let i = 0; i < response.body.length - 2; i++) {
      expect(response.body[i].score).toBeGreaterThanOrEqual(
        response.body[i + 1].score
      );
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
