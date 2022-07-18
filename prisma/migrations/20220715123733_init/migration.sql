/*
  Warnings:

  - You are about to drop the column `author` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `writtenBy` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookTime` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "author",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "writtenBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "cookTime" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
