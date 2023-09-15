-- CreateTable
CREATE TABLE `agentActivityLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agent_id` INTEGER NOT NULL,
    `campaign_id` INTEGER NOT NULL,
    `activity_type` ENUM('Start', 'End', 'Break') NOT NULL,
    `activity_time` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agentActivityLog` ADD CONSTRAINT `agentActivityLog_agent_id_fkey` FOREIGN KEY (`agent_id`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agentActivityLog` ADD CONSTRAINT `agentActivityLog_campaign_id_fkey` FOREIGN KEY (`campaign_id`) REFERENCES `CampaignHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
