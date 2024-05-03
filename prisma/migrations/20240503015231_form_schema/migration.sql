/*
  Warnings:

  - You are about to drop the column `published` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `shareURL` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `submissions` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `visits` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the `FormSubmissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormSubmissions" DROP CONSTRAINT "FormSubmissions_formId_fkey";

-- DropIndex
DROP INDEX "Form_shareURL_key";

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "published",
DROP COLUMN "shareURL",
DROP COLUMN "submissions",
DROP COLUMN "visits";

-- DropTable
DROP TABLE "FormSubmissions";
