-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "imagePath" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "imagePath" DROP NOT NULL,
ALTER COLUMN "filePath" DROP NOT NULL;
