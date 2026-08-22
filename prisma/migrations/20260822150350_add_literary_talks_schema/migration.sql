/*
  Warnings:

  - You are about to drop the column `rating` on the `books` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `books` DROP COLUMN `rating`,
    ADD COLUMN `youtube_url` VARCHAR(500) NULL;

-- CreateTable
CREATE TABLE `literary_talks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NULL,
    `youtube_url` VARCHAR(500) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(100) NULL,
    `author_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `literary_talks_author_id_idx`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `literary_talks` ADD CONSTRAINT `literary_talks_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
