/*
  Warnings:

  - You are about to drop the column `image` on the `tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tag` DROP COLUMN `image`;

-- CreateTable
CREATE TABLE `TagImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tagId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TagImage` ADD CONSTRAINT `TagImage_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
