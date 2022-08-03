import { prisma } from "../../src/database.js";
import { faker } from "@faker-js/faker";

export async function insertSampleData(amouunt = 20) {
  for (let i = 0; i < amouunt; i++) {
    await prisma.recommendation.create({
      data: {
        name: faker.name.findName(),
        youtubeLink: "https://www.youtube.com/watch?v=r2sCy9ZOToA",
      },
    });
  }
}

export async function insertOne(name = "孤城") {
  await prisma.recommendation.upsert({
    where: { name },
    update: {},
    create: {
      name,
      youtubeLink: "https://www.youtube.com/watch?v=r2sCy9ZOToA",
    },
  });
  const { id } = await prisma.recommendation.findUnique({
    where: {
      name,
    },
  });
  return id;
}
