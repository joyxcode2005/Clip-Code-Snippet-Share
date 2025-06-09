/*
  Warnings:

  - The values [WEB_DEVELOPEMENT,DEVOPS_LINUX,CYBER_SECURITY] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The values [JAVASCRIPT,PYTHON,CPP,C,JAVA,RUST,GO] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('DSA', 'Web_Dev', 'Devops', 'AI_ML');
ALTER TABLE "Snippet" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Language_new" AS ENUM ('javascript', 'python', 'html', 'css', 'sql', 'markdown', 'json');
ALTER TABLE "Snippet" ALTER COLUMN "language" TYPE "Language_new" USING ("language"::text::"Language_new");
ALTER TYPE "Language" RENAME TO "Language_old";
ALTER TYPE "Language_new" RENAME TO "Language";
DROP TYPE "Language_old";
COMMIT;
