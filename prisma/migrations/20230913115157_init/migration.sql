/*
  Warnings:

  - You are about to drop the column `createdAt` on the `agentactivitylog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `agentactivitylog` DROP FOREIGN KEY `agentActivityLog_campaign_id_fkey`;

-- AlterTable
ALTER TABLE `agentactivitylog` DROP COLUMN `createdAt`;
