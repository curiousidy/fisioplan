-- CreateTable
CREATE TABLE "TimeRange" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "morning" TEXT[],
    "afternoon" TEXT[],

    CONSTRAINT "TimeRange_pkey" PRIMARY KEY ("id")
);
