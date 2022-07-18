import express, { Router, Request, Response } from "express";
import { Product } from "../types/product";

export const productsRouter = (service: any) => {
  const router: Router = express.Router();

  const getProducts = async (req: Request, res: Response) => {
    try {
      const products: Product[] = await service.getProducts();

      res.status(200).json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get products." });
    }
  };

  const addProduct = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      const product: Product = await service.addProduct(name);

      if (product) {
        res.status(201).json(product);
      } else {
        res.status(500).json({ message: "Failed to add a new product." });
      }
    } catch (error: any) {
      res.status(400).json({ message: "Failed to add a new product." });
    }
  };

  router.get("/", getProducts);
  router.post("/", addProduct);

  return router;
};
