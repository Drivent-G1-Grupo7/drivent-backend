/*
  Warnings:

  - Added the required column `EventId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "EventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_EventId_fkey" FOREIGN KEY ("EventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
