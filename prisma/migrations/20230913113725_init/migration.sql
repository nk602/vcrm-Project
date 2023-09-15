/*
  Warnings:

  - A unique constraint covering the columns `[campaign_id]` on the table `Campaigns` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `agentactivitylog` DROP FOREIGN KEY `agentActivityLog_id_fkey`;

-- AlterTable
ALTER TABLE `agentactivitylog` MODIFY `campaign_id` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `campaigns` ALTER COLUMN `campaign_id` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Campaigns_campaign_id_key` ON `Campaigns`(`campaign_id`);

-- AddForeignKey
ALTER TABLE `agentActivityLog` ADD CONSTRAINT `agentActivityLog_campaign_id_fkey` FOREIGN KEY (`campaign_id`) REFERENCES `Campaigns`(`campaign_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
