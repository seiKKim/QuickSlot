-- DropForeignKey
ALTER TABLE `testimonials` DROP FOREIGN KEY `testimonials_userId_fkey`;

-- DropIndex
DROP INDEX `testimonials_userId_fkey` ON `testimonials`;

-- AlterTable
ALTER TABLE `testimonials` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
