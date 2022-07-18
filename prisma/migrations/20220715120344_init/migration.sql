-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MealToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_key" ON "Product"("product");

-- CreateIndex
CREATE UNIQUE INDEX "_MealToProduct_AB_unique" ON "_MealToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MealToProduct_B_index" ON "_MealToProduct"("B");

-- AddForeignKey
ALTER TABLE "_MealToProduct" ADD CONSTRAINT "_MealToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToProduct" ADD CONSTRAINT "_MealToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
