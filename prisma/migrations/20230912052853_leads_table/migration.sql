-- CreateTable
CREATE TABLE `Leads` (
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
