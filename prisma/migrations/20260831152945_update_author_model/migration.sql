/*
  Warnings:

  - You are about to drop the column `name` on the `authors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pen_name]` on the table `authors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pen_name` to the `authors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `authors` DROP COLUMN `name`,
    ADD COLUMN `birth_place` VARCHAR(150) NULL,
    ADD COLUMN `date_of_birth` DATE NULL,
    ADD COLUMN `date_of_death` DATE NULL,
    ADD COLUMN `is_anonymous` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `pen_name` VARCHAR(150) NOT NULL,
    ADD COLUMN `real_name` VARCHAR(150) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `authors_pen_name_key` ON `authors`(`pen_name`);
