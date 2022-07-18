import express, { Express } from "express";
import { productsRouter } from "./routes/products.router";
import { mealsRouter } from "./routes/meals.router";
import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: "https://dotcode.io",
  credentials: true,
};

export default function (services: any) {
  const app: Express = express();

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use("/products", productsRouter(services.products));
  app.use("/meals", mealsRouter(services.meals));

  return app;
}
