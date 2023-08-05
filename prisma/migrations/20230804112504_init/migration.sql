/*
  Warnings:

  - You are about to drop the column `permanentaddressState` on the `employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `permanentaddressState`,
    ADD COLUMN `permanentAddressState` VARCHAR(191) NOT NULL DEFAULT '';
