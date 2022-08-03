import { jest } from "@jest/globals";

import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

jest.mock("../../src/repositories/recommendationRepository");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("recommendationsService insert test suite", () => {
  it("given valid recommendation should create a recommendation", async () => {
    const newRecommendation = {
      name: "test",
      youtubeLink: "https://youtube.com",
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce(null);

    await recommendationService.insert(newRecommendation);
    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });
  it("given repeated recommendation should throw error", async () => {
    const newRecommendation = {
      id: 1,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(newRecommendation);
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce(null);

    const promise = recommendationService.insert(newRecommendation);
    expect(recommendationRepository.findByName).toBeCalled();
    expect(promise).rejects.toEqual({
      message: "Recommendations names must be unique",
      type: "conflict",
    });
  });
});

describe("recommendationsService vote test suite", () => {
  it("given valid recommendation id should downvote", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };
    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(newRecommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(newRecommendation);

    await recommendationService.downvote(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("given below (-5) score should delete recommendation", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: -6,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(newRecommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(newRecommendation);
    jest.spyOn(recommendationRepository, "remove").mockResolvedValueOnce(null);

    await recommendationService.downvote(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });
  it("given invalid recommendation id should throw error", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(null);

    const promise = recommendationService.downvote(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(promise).rejects.toEqual({
      message: "",
      type: "not_found",
    });
  });
  it("given valid recommendation id should upvote", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(newRecommendation);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(null);

    await recommendationService.upvote(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });
  it("given invalid recommendation id should throw error", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(null);

    const promise = recommendationService.upvote(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(promise).rejects.toEqual({
      message: "",
      type: "not_found",
    });
  });
});

describe("recommendationsService get test suite", () => {
  it("should get last recommendations", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce(null);

    await recommendationService.get();
    expect(recommendationRepository.findAll).toBeCalled();
  });
  it("given valid recommendation id should get recommendation", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(newRecommendation);

    const response = await recommendationService.getById(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(response).toEqual(newRecommendation);
  });
  it("given invalid recommendation id should get recommendation", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    const promise = recommendationService.getById(newRecommendation.id);
    expect(recommendationRepository.find).toBeCalled();
    expect(promise).rejects.toEqual({
      message: "",
      type: "not_found",
    });
  });
  it("should get recommendations by random 70% 30%", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    const times = 100;
    let gt = 0;
    let lte = 0;

    for (let i = 0; i < times; i++) {
      const random = Math.random();
      jest.spyOn(Math, "random").mockReturnValueOnce(random);
      if (random < 0.7) {
        newRecommendation.score = 11;
        gt++;
      } else {
        newRecommendation.score = 1;
        lte++;
      }
      jest
        .spyOn(recommendationRepository, "findAll")
        .mockResolvedValueOnce([newRecommendation]);
      const response = await recommendationService.getRandom();
      expect(response.score).toEqual(newRecommendation.score);
    }
    expect(Math.ceil((10 * gt) / times)/10).toBeGreaterThanOrEqual(0.7);
    expect(Math.floor((10 * lte) / times)/10).toBeLessThanOrEqual(0.3);
    expect(recommendationRepository.findAll).toBeCalledTimes(times);
  });
  it("should get recommendations by random", async () => {
    const newRecommendation = {
      id: 0,
      name: "test",
      youtubeLink: "https://youtube.com",
      score: 0,
    };

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementation((something?: any): any => {
        if (something) {
          return [];
        }
        return [newRecommendation];
      });

    const times = 10;
    for (let i = 0; i < times; i++) {
      const response = await recommendationService.getRandom();
      expect(response).toEqual(newRecommendation);
    }
    expect(recommendationRepository.findAll).toBeCalledTimes(2*times);
  });
  it("should throw error when recommendations is empty", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    let errorPromise: any;
    try {
      await recommendationService.getRandom();
    } catch (error) {
      errorPromise = error;
    }
    expect(recommendationRepository.findAll).toBeCalled();
    expect(errorPromise).toEqual({
      message: "",
      type: "not_found",
    });
  });
  it("should get recommendations by top", async () => {
    const amount = 0;

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValueOnce(null);

    await recommendationService.getTop(amount);
    expect(recommendationRepository.getAmountByScore).toBeCalled();
  });
});
