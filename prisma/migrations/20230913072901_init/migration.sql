-- AlterTable
ALTER TABLE `agentactivitylog` MODIFY `activity_type` ENUM('Start', 'End', 'Break') NOT NULL DEFAULT 'Start';
