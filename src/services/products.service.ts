import prisma from "./prisma.service";
import { Product } from "../types/product";

export const getProducts = async () => {
  const products: Product[] = await prisma.product.findMany({
    orderBy: [
      {
        product: "asc",
      },
    ],
  });

  return products;
};

export const addProduct = async (name: string) => {
  const product: Product = await prisma.product.create({
    data: { product: name },
  });
  return product;
};
