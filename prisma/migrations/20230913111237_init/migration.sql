/*
  Warnings:

  - You are about to drop the `campaignhistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `agentactivitylog` DROP FOREIGN KEY `agentActivityLog_campaign_id_fkey`;

-- AlterTable
ALTER TABLE `agentactivitylog` MODIFY `campaign_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `campaignhistory`;

-- CreateTable
CREATE TABLE `Campaigns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` INTEGER NOT NULL,
    `designation` INTEGER NOT NULL,
    `logo` VARCHAR(191) NOT NULL DEFAULT '',
    `campaign_id` VARCHAR(191) NOT NULL DEFAULT '',
    `campaign_name` VARCHAR(191) NOT NULL DEFAULT '',
    `campaign_type` VARCHAR(191) NOT NULL DEFAULT '',
    `campaign_product` VARCHAR(191) NOT NULL DEFAULT '',
    `team_leaders` VARCHAR(191) NOT NULL DEFAULT '',
    `team_agents` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agentActivityLog` ADD CONSTRAINT `agentActivityLog_id_fkey` FOREIGN KEY (`id`) REFERENCES `Campaigns`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
