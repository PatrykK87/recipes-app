export const orderMeals = (order: any) => {
  let orderObj = {};

  switch (order) {
    case "c": {
      orderObj = { cookTime: "asc" };
      break;
    }
    case "cd": {
      orderObj = { cookTime: "desc" };
      break;
    }
    default: {
      orderObj = { createdAt: "desc" };
    }
  }

  return orderObj;
};

export const filterMeals = (min: any, max: any) => {
  let whereObj = {};
  const gte = Number(min);
  const lte = Number(max);

  if (gte && lte) {
    whereObj = { cookTime: { gte, lte } };
  } else if (gte) {
    whereObj = { cookTime: { gte } };
  } else if (lte) {
    whereObj = { cookTime: { lte } };
  }

  return whereObj;
};
