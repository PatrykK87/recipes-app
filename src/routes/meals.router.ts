import express, { Router, Request, Response } from "express";
import { Meal } from "../types/meal";
import { orderMeals, filterMeals } from "../controllers/meals.controller";

export const mealsRouter = (service: any) => {
  const router: Router = express.Router();

  const getMeals = async (req: Request, res: Response) => {
    try {
      let { order, min, max } = req.query;

      let orderObj = orderMeals(order);

      let whereObj = filterMeals(min, max);

      const meals: Meal[] = await service.getMeals(orderObj, whereObj);

      res.status(200).json(meals);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to get meals." });
    }
  };

  const addMeal = async (req: Request, res: Response) => {
    try {
      const { data, products } = req.body;

      Object.assign(data, {
        products: {
          connect: products,
        },
      });

      const meal: Meal = await service.addMeal(data);

      if (meal) {
        res.status(201).json(meal);
      } else {
        res.status(500).json({ message: "Failed to add a new meal." });
      }
    } catch (error: any) {
      res.status(400).json({ message: "Failed to add a new meal." });
    }
  };

  const addComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { writtenBy, comment } = req.body;

      const meal = await service.addComment(id, comment, writtenBy);

      if (meal) {
        res.status(200).json(meal);
      } else {
        res
          .status(500)
          .json({ message: "Failed to add a new comment to meal." });
      }
    } catch (error: any) {
      res.status(400).json({ message: "Failed to add a new comment to meal." });
    }
  };

  router.get("/", getMeals);
  router.post("/", addMeal);
  router.put("/:id", addComment);

  return router;
};
