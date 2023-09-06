/*
  Warnings:

  - The primary key for the `locations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "locations" DROP CONSTRAINT "locations_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "locations_id_seq";
