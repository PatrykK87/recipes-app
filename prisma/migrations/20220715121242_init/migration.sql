/*
  Warnings:

  - You are about to drop the `_MealToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MealToProduct" DROP CONSTRAINT "_MealToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_MealToProduct" DROP CONSTRAINT "_MealToProduct_B_fkey";

-- DropTable
DROP TABLE "_MealToProduct";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "mealId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToMeal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToMeal_AB_unique" ON "_ProductToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToMeal_B_index" ON "_ProductToMeal"("B");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_ProductToMeal" ADD CONSTRAINT "_ProductToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToMeal" ADD CONSTRAINT "_ProductToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
