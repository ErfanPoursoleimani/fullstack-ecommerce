/*
  Warnings:

  - You are about to drop the column `label` on the `image` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `tagimage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `label`;

-- AlterTable
ALTER TABLE `tagimage` DROP COLUMN `label`;
