-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);
