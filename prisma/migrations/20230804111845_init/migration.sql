-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL DEFAULT '',
    `lastName` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `mobileNumber` VARCHAR(191) NOT NULL DEFAULT '',
    `gender` VARCHAR(191) NOT NULL DEFAULT '',
    `dob` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressCountry` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressState` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressCity` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressArea` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressLane` VARCHAR(191) NOT NULL DEFAULT '',
    `currentAddressPinCode` VARCHAR(191) NOT NULL DEFAULT '',
    `sameAsCurrentAddress` BOOLEAN NOT NULL DEFAULT false,
    `permanentAddressCountry` VARCHAR(191) NOT NULL DEFAULT '',
    `permanentaddressState` VARCHAR(191) NOT NULL DEFAULT '',
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
