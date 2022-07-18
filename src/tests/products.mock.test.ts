import request from "supertest";
import makeApp from "../app";
import { jest } from "@jest/globals";

const getProducts = jest.fn();
const addProduct = jest.fn();

const app = makeApp({
  products: {
    getProducts,
    addProduct,
  },
});

describe("getProducts service", () => {
  beforeEach(() => {
    getProducts.mockReset();
  });

  it("should be called once", async () => {
    const response = await request(app).get(`/products`);
    expect(getProducts).toHaveBeenCalled();
  });
});

describe("addProduct service", () => {
  beforeEach(() => {
    addProduct.mockReset();
  });

  it("should be called once given a name", async () => {
    const name = "Test";
    const response = await request(app).post(`/products`).send({ name });
    expect(addProduct).toHaveBeenCalledWith(name);
  });
});
