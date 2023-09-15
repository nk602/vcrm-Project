-- DropIndex
DROP INDEX `agentActivityLog_campaign_id_fkey` ON `agentactivitylog`;

-- AlterTable
ALTER TABLE `agentactivitylog` ALTER COLUMN `campaign_id` DROP DEFAULT;
