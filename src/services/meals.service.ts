import prisma from "./prisma.service";
import { Meal } from "../types/meal";

export const getMeals = async (orderObj: any, whereObj: any) => {
  const meals: Meal[] = await prisma.meal.findMany({
    where: whereObj,
    orderBy: [orderObj],
    include: { products: true, comments: true },
  });

  return meals;
};

export const addMeal = async (data: any) => {
  const meal: Meal = await prisma.meal.create({
    data,
    include: {
      products: true,
    },
  });

  return meal;
};

export const addComment = async (
  id: string,
  comment: string,
  writtenBy: string
) => {
  const meal = await prisma.meal.update({
    where: { id: Number(id) },
    data: {
      comments: {
        create: {
          comment,
          writtenBy,
        },
      },
    },
  });

  return meal;
};
