import request from "supertest";
import makeApp from "../app";
import { jest } from "@jest/globals";

const getMeals = jest.fn();
const addMeal = jest.fn();
const addComment = jest.fn();

const app = makeApp({
  meals: {
    getMeals,
    addMeal,
    addComment,
  },
});

describe("getMeals service", () => {
  beforeEach(() => {
    getMeals.mockReset();
  });

  it("should be called once without params", async () => {
    const orderObj = { createdAt: "desc" };
    const whereObj = {};
    const response = await request(app).get(`/meals`);
    expect(getMeals).toHaveBeenCalledWith(orderObj, whereObj);
  });

  it("should be called once with order being c", async () => {
    const orderObj = { cookTime: "asc" };
    const whereObj = {};
    const response = await request(app).get(`/meals`).query({ order: "c" });
    expect(getMeals).toHaveBeenCalledWith(orderObj, whereObj);
  });

  it("should be called once with order being cd", async () => {
    const orderObj = { cookTime: "desc" };
    const whereObj = {};
    const response = await request(app).get(`/meals`).query({ order: "cd" });
    expect(getMeals).toHaveBeenCalledWith(orderObj, whereObj);
  });

  it("should be called once with filter min being 30", async () => {
    const orderObj = { createdAt: "desc" };
    const whereObj = { cookTime: { gte: 30 } };
    const response = await request(app).get(`/meals`).query({ min: 30 });
    expect(getMeals).toHaveBeenCalledWith(orderObj, whereObj);
  });

  it("should be called once with filter max being 40", async () => {
    const orderObj = { createdAt: "desc" };
    const whereObj = { cookTime: { lte: 40 } };
    const response = await request(app).get(`/meals`).query({ max: 40 });
    expect(getMeals).toHaveBeenCalledWith(orderObj, whereObj);
  });

  it("should be called once with filter min being 20 and max being 50", async () => {
    const orderObj = { createdAt: "desc" };
    const whereObj = { cookTime: { gte: 20, lte: 50 } };
    const response = await request(app)
      .get(`/meals`)
      .query({ min: 20, max: 50 });
    expect(getMeals).toHaveBeenCalledWith(orderObj, whereObj);
  });
});

describe("addMeal service", () => {
  beforeEach(() => {
    addMeal.mockReset();
  });

  it("should be called once and assemble data", async () => {
    const body = {
      data: {
        title: "title3",
        content: "content",
        cookTime: 20,
        author: "author",
      },
      products: [{ id: 5 }, { id: 12 }],
    };
    const data = {
      title: "title3",
      content: "content",
      cookTime: 20,
      author: "author",
      products: {
        connect: [{ id: 5 }, { id: 12 }],
      },
    };

    const response = await request(app).post(`/meals`).send(body);
    expect(addMeal).toHaveBeenCalledWith(data);
  });
});

describe("addComment service", () => {
  beforeEach(() => {
    addComment.mockReset();
  });

  it("should be called once and assemble data", async () => {
    const id = "524";
    const body = {
      writtenBy: "someone",
      comment: "great dish!",
    };

    const response = await request(app).put(`/meals/${id}`).send(body);
    expect(addComment).toHaveBeenCalledWith(id, body.comment, body.writtenBy);
  });
});
