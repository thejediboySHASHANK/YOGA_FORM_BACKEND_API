/*
  Warnings:

  - You are about to drop the column `name` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `name`,
    MODIFY `expiresAt` DATETIME(3) NULL,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT false;
