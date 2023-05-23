/*
  Warnings:

  - You are about to drop the column `EventId` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_EventId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "EventId",
ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
