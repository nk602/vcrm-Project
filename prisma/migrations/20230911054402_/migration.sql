-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191) NOT NULL DEFAULT '',
    `date` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL DEFAULT '',
    `lastName` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `mobileNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `gender` VARCHAR(191) NOT NULL DEFAULT '',
    `dob` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressCountry` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressState` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressCity` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressArea` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressLane` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressPinCode` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentAddressCountry` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentAddressState` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentAddressCity` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentAddressArea` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentAddressLane` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentAddressPinCode` VARCHAR(191) NOT NULL DEFAULT '',
    `companyName` VARCHAR(191) NOT NULL DEFAULT '',
    `department` VARCHAR(191) NOT NULL DEFAULT '',
    `designation` VARCHAR(191) NOT NULL DEFAULT '',
    `dateOfJoin` VARCHAR(191) NOT NULL DEFAULT '',
    `adharImage` VARCHAR(191) NOT NULL DEFAULT '',
    `adharNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `panImage` VARCHAR(191) NOT NULL DEFAULT '',
    `PanNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `drivingLicenseImage` VARCHAR(191) NOT NULL DEFAULT '',
    `chequeImage` VARCHAR(191) NOT NULL DEFAULT '',
    `accountNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `accountName` VARCHAR(191) NOT NULL DEFAULT '',
    `bankName` VARCHAR(191) NOT NULL DEFAULT '',
    `ifsc` VARCHAR(191) NOT NULL DEFAULT '',
    `published` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `employee_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Masters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MastersValues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `masterId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EnquiryForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL DEFAULT '',
    `lastName` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `phoneNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `totalWorkExperience` VARCHAR(191) NOT NULL DEFAULT '',
    `highestLevelOfEducation` VARCHAR(191) NOT NULL DEFAULT '',
    `graduationYear` VARCHAR(191) NOT NULL DEFAULT '',
    `jobTitle` VARCHAR(191) NOT NULL DEFAULT '',
    `companyName` VARCHAR(191) NOT NULL DEFAULT '',
    `utmCompaign` VARCHAR(191) NOT NULL DEFAULT '',
    `englishLanguage` VARCHAR(191) NOT NULL DEFAULT '',
    `city` VARCHAR(191) NOT NULL DEFAULT '',
    `state` VARCHAR(191) NOT NULL DEFAULT '',
    `courseid` VARCHAR(191) NOT NULL DEFAULT '',
    `utmTerm` VARCHAR(191) NOT NULL DEFAULT '',
    `utmMedium` VARCHAR(191) NOT NULL DEFAULT '',
    `utmSource` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disposition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subdisposition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `depositionId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campaignName` VARCHAR(191) NOT NULL DEFAULT '',
    `campaignTeam` VARCHAR(191) NOT NULL DEFAULT '',
    `dispositionName` VARCHAR(191) NOT NULL DEFAULT '',
    `createdBy` VARCHAR(191) NOT NULL DEFAULT '',
    `count` INTEGER NOT NULL,
    `campaignStatus` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MastersValues` ADD CONSTRAINT `MastersValues_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `Masters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subdisposition` ADD CONSTRAINT `Subdisposition_depositionId_fkey` FOREIGN KEY (`depositionId`) REFERENCES `Disposition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
