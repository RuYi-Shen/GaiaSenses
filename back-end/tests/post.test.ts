import app from "../src/app.js";
import supertest from "supertest";
import { prisma } from "../src/database.js";
import { insertOne } from "./factories/recommendationsFactory.js";

beforeEach(async () => {
  await prisma.recommendation.deleteMany({});
});

describe("POST /recommendations", () => {
  it("given a video with duplicate name it should return 409", async () => {
    const newVideo = {
      name: "孤城",
      youtubeLink: "https://www.youtube.com/watch?v=r2sCy9ZOToA",
    };

    const firstTry = await supertest(app)
      .post("/recommendations")
      .send(newVideo);
    expect(firstTry.status).toEqual(201);

    const secondTry = await supertest(app)
      .post("/recommendations")
      .send(newVideo);
    expect(secondTry.status).toEqual(409);

    const videoFromDb = await prisma.recommendation.findUnique({
      where: {
        name: newVideo.name,
      },
    });
    expect(videoFromDb).toBeDefined();
  });

  it("given a video with no name it should return 422", async () => {
    const newVideo = {
      youtubeLink: "https://www.youtube.com/watch?v=r2sCy9ZOToA",
    };

    const response = await supertest(app)
      .post("/recommendations")
      .send(newVideo);
    expect(response.status).toEqual(422);
  });

  it("given a video with invalid youtube link it should return 422", async () => {
    const newVideo = {
      name: "孤城",
      youtubeLink: "https://www.google.com.br/",
    };

    const response = await supertest(app)
      .post("/recommendations")
      .send(newVideo);
    expect(response.status).toEqual(422);
  });

  it("given a valid video ID up vote should return 200", async () => {
    const id = await insertOne();

    const response = await supertest(app).post(`/recommendations/${id}/upvote`);
    expect(response.status).toEqual(200);

    const videoFromDb = await prisma.recommendation.findUnique({
      where: {
        id,
      },
    });
    expect(videoFromDb.score).toBe(1);
  });

  it("given a invalid video ID vote should return 404", async () => {
    const response = await supertest(app).post("/recommendations/0/upvote");
    expect(response.status).toEqual(404);
  });

  it("given a valid video ID down vote should return 200", async () => {
    const id = await insertOne();

    const response = await supertest(app).post(
      `/recommendations/${id}/downvote`
    );
    expect(response.status).toEqual(200);
    const videoFromDb = await prisma.recommendation.findUnique({
      where: {
        id,
      },
    });
    expect(videoFromDb.score).toBe(-1);
  });

  it("should exclude recommendation when score below -5", async () => {
    const id = await insertOne();

    for (let i = 0; i > -5; i--) {
      const response = await supertest(app).post(
        `/recommendations/${id}/downvote`
      );
    }

    let videoFromDb = await prisma.recommendation.findUnique({
      where: {
        id,
      },
    });
    expect(videoFromDb.score).toBe(-5);
    await supertest(app).post(`/recommendations/${id}/downvote`);

    videoFromDb = await prisma.recommendation.findUnique({
      where: {
        id,
      },
    });
    expect(videoFromDb).toBeNull();
  });

  it("given a invalid video ID down vote should return 404", async () => {
    const response = await supertest(app).post("/recommendations/0/downvote");
    expect(response.status).toEqual(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
