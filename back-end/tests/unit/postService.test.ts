import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { likeService } from "../../src/services/likeService.js";
import { postService } from "../../src/services/postService.js";
import { postRepository } from "../../src/repositories/postRepository.js";

jest.mock("../../src/repositories/postRepository");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("create and publish posts test suite", () => {
  it("given valid post informatiosn should create a new post", async () => {
    const postContent = {
      userId: +faker.random.numeric(),
      content: faker.lorem.paragraph(),
      url: faker.internet.url(),
    };

    jest.spyOn(postRepository, "create").mockResolvedValueOnce(null);

    await postService.createPost(postContent);
    expect(postRepository.create).toBeCalled();
  });
  it("given valid userId and postId should publish the post", async () => {
    const publishContent = {
      userId: +faker.random.numeric(),
      postId: +faker.random.numeric(),
    };

    const post = {
      id: publishContent.postId,
      userId: publishContent.userId,
      content: faker.lorem.paragraph(),
      url: faker.internet.url(),
      published: false,
      createdAt: faker.date.past(),
    };

    jest.spyOn(postRepository, "findById").mockResolvedValueOnce(post);
    jest.spyOn(postRepository, "publish").mockResolvedValueOnce(null);

    await postService.publishPost(publishContent.postId, publishContent.userId);
    expect(postRepository.findById).toBeCalled();
    expect(postRepository.publish).toBeCalled();
  });
  it("given invalid userId for postId should throw error", async () => {
    const publishContent = {
      userId: +faker.random.numeric(),
      postId: +faker.random.numeric(),
    };
    const post = {
      id: publishContent.postId,
      userId: publishContent.userId + 1,
      content: faker.lorem.paragraph(),
      url: faker.internet.url(),
      published: false,
      createdAt: faker.date.recent(),
    };

    jest.spyOn(postRepository, "findById").mockResolvedValueOnce(post);
    jest.spyOn(postRepository, "publish").mockResolvedValueOnce(null);

    const promise = postService.publishPost(
      publishContent.postId,
      publishContent.userId
    );
    expect(promise).rejects.toThrowError("You can't publish this post");
    expect(postRepository.findById).toBeCalled();
    expect(postRepository.publish).not.toBeCalled();
  });
});

describe("get posts test suite", () => {
  it("given valid userId should return list of best posts", async () => {
    const userId = +faker.random.numeric();
    const fakePost = {
      _count: { Like: +faker.random.numeric() },
    };

    const postsList = [];
    for (let i = 0; i < +faker.random.numeric(); i++) {
      postsList.push(fakePost);
    }

    jest.spyOn(postRepository, "findLastWeek").mockResolvedValueOnce(postsList);
    jest.spyOn(likeService, "getLikes").mockResolvedValue(null);

    const posts = await postService.getBestPosts(userId);
    expect(postRepository.findLastWeek).toBeCalled();
    expect(likeService.getLikes).toBeCalledTimes(posts.length);
  });
  it("given valid userId should return list of new posts", async () => {
    const userId = +faker.random.numeric();
    const fakePost = {
      _count: { Like: +faker.random.numeric() },
    };

    const postsList = [];
    for (let i = 0; i < +faker.random.numeric(); i++) {
      postsList.push(fakePost);
    }

    jest.spyOn(postRepository, "findAll").mockResolvedValueOnce(postsList);
    jest.spyOn(likeService, "getLikes").mockResolvedValue(null);

    const posts = await postService.getNewPosts(userId);
    expect(postRepository.findAll).toBeCalled();
    expect(likeService.getLikes).toBeCalledTimes(posts.length);
  });
  it("given valid userId should return list of user posts", async () => {
    const userId = +faker.random.numeric();
    const fakePost = {
      _count: { Like: +faker.random.numeric() },
    };

    const postsList = [];
    for (let i = 0; i < +faker.random.numeric(); i++) {
      postsList.push(fakePost);
    }

    jest.spyOn(postRepository, "findUser").mockResolvedValueOnce(postsList);
    jest.spyOn(likeService, "getLikes").mockResolvedValue(null);

    const posts = await postService.getUserPosts(userId);
    expect(postRepository.findUser).toBeCalled();
    expect(likeService.getLikes).toBeCalledTimes(posts.length);
  });
  it("given valid userId should return list of liked posts", async () => {
    const userId = +faker.random.numeric();
    const fakePost = {
      post: {}
    };

    const postsList = [];
    for (let i = 0; i < +faker.random.numeric(); i++) {
      postsList.push(fakePost);
    }

    jest.spyOn(postRepository, "findLiked").mockResolvedValueOnce(postsList);
    jest.spyOn(likeService, "getLikes").mockResolvedValue(null);

    const posts = await postService.getLikedPosts(userId);
    expect(postRepository.findLiked).toBeCalled();
    expect(likeService.getLikes).toBeCalledTimes(posts.length);
  });
});
