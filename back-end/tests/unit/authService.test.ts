import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { authService } from "../../src/services/authService.js";
import { userRepository } from "../../src/repositories/userRepository.js";
import { emailUtils } from "../../src/utils/emailUtils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("../../src/repositories/userRepository");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("authentication test suite", () => {
  it("given valid register info should create a new user", async () => {
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(userRepository, "create").mockResolvedValueOnce(null);
    jest.spyOn(bcrypt, "hash");

    await authService.createUser(user);
    expect(userRepository.create).toBeCalled();
    expect(bcrypt.hash).toBeCalled();
  });
  it("given same userId should return same jwt", async () => {
    const userId = +faker.random.numeric();

    jest.spyOn(jwt, "sign");

    const token1 = authService.createSession(userId);
    expect(jwt.sign).toBeCalled();
    expect(token1).toBeDefined();
    const token2 = authService.createSession(userId);
    expect(jwt.sign).toBeCalled();
    expect(token2).toBe(token1);
  });
});

describe("email activation test suite", () => {
  it("given valid email should send a confirmation email", async () => {
    const email = faker.internet.email();

    jest.spyOn(emailUtils, "sendEmail").mockResolvedValueOnce(null);
    jest.spyOn(jwt, "sign");

    await authService.sendConfirmationEmail(email);
    expect(jwt.sign).toBeCalled();
    expect(emailUtils.sendEmail).toBeCalled();
  });
  it("given valid userId should activate account", async () => {
    const userId = +faker.random.numeric();

    jest.spyOn(userRepository, "activate").mockResolvedValueOnce(null);

    authService.activateAccount(userId);
    expect(userRepository.activate).toBeCalled();
  });
});
