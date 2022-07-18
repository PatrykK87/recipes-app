import "dotenv/config";
import * as products from "./services/products.service";
import * as meals from "./services/meals.service";
import makeApp from "./app";

const { SERVER_PORT } = process.env;

const app = makeApp({
  products,
  meals,
});

app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running on port ${SERVER_PORT}`);
});
