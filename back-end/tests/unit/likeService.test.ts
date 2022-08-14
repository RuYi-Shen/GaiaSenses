import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { likeService } from "../../src/services/likeService.js";
import { likeRepository } from "../../src/repositories/likeRepository.js";

jest.mock("../../src/repositories/likeRepository");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("likes management test suite", () => {
  it("given valid userId and postId should register a like", async () => {
    const likeContent = {
      userId: +faker.random.numeric(),
      postId: +faker.random.numeric(),
    };

    jest.spyOn(likeRepository, "create").mockResolvedValueOnce(null);

    await likeService.likePost(likeContent);
    expect(likeRepository.create).toBeCalled();
  });
  it("given valid userId and postId should remove a like", async () => {
    const likeContent = {
      userId: +faker.random.numeric(),
      postId: +faker.random.numeric(),
    };

    jest.spyOn(likeRepository, "deleteById").mockResolvedValueOnce(null);

    await likeService.dislikePost(likeContent);
    expect(likeRepository.deleteById).toBeCalled();
  });
});

describe("likes information test suite", () => {
  it("given valid userId and postId should return likes infomation of the post", async () => {
    const likeContent = {
      userId: +faker.random.numeric(),
      postId: +faker.random.numeric(),
    };

    jest.spyOn(likeRepository, "getById").mockResolvedValueOnce(undefined);
    jest.spyOn(likeRepository, "getByPost").mockResolvedValueOnce([]);
    jest.spyOn(likeRepository, "countByPost").mockResolvedValueOnce(0);

    const likeInfo = await likeService.getLikes(likeContent);
    expect(likeRepository.getById).toBeCalled();
    expect(likeRepository.getByPost).toBeCalled();
    expect(likeRepository.countByPost).toBeCalled();
    expect(likeInfo).toMatchObject({liked: false, users: [], count: 0});
  });
  it("given valid userId and postId should return username if liked", async () => {
    const likeContent = {
      userId: +faker.random.numeric(),
      postId: +faker.random.numeric(),
    };

    const user = {
      id: +faker.random.numeric(),
      name: faker.name.fullName(),
    };

    jest.spyOn(likeRepository, "getById").mockResolvedValueOnce({user});
    jest.spyOn(likeRepository, "getByPost").mockResolvedValueOnce([]);
    jest.spyOn(likeRepository, "countByPost").mockResolvedValueOnce(1);

    const likeInfo = await likeService.getLikes(likeContent);
    expect(likeRepository.getById).toBeCalled();
    expect(likeRepository.getByPost).toBeCalled();
    expect(likeRepository.countByPost).toBeCalled();
    expect(likeInfo).toMatchObject({liked: true, users: [user], count: 1});
  });
});