/*
  Warnings:

  - You are about to drop the column `author_id` on the `books` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_author_id_fkey`;

-- DropIndex
DROP INDEX `books_author_id_idx` ON `books`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `author_id`,
    ADD COLUMN `original_author` VARCHAR(150) NULL,
    ADD COLUMN `original_title` VARCHAR(200) NULL;

-- CreateTable
CREATE TABLE `book_authors` (
    `book_id` INTEGER NOT NULL,
    `author_id` INTEGER NOT NULL,
    `role` ENUM('AUTHOR', 'TRANSLATOR', 'CO_AUTHOR', 'COMPILER') NOT NULL DEFAULT 'AUTHOR',

    PRIMARY KEY (`book_id`, `author_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `book_authors` ADD CONSTRAINT `book_authors_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book_authors` ADD CONSTRAINT `book_authors_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
