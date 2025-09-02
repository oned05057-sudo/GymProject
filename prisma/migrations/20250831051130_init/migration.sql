-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "guardianName" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "DOB" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsAppNumber" TEXT NOT NULL,
    "dietPreference" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "involvedInSports" TEXT NOT NULL,
    "experienceLevel" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "chest" TEXT NOT NULL,
    "calf" TEXT NOT NULL,
    "biceps" TEXT NOT NULL,
    "thigh" TEXT NOT NULL,
    "waist" TEXT NOT NULL,
    "medicalConditions" TEXT NOT NULL,
    "disciplineStatus" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "idCardUrl" TEXT NOT NULL
);
INSERT INTO "new_User" ("DOB", "address", "biceps", "calf", "category", "chest", "date", "dietPreference", "disciplineStatus", "email", "enrollmentId", "experienceLevel", "guardianName", "height", "id", "idCardUrl", "involvedInSports", "medicalConditions", "name", "photoUrl", "purpose", "thigh", "waist", "weight", "whatsAppNumber") SELECT "DOB", "address", "biceps", "calf", "category", "chest", "date", "dietPreference", "disciplineStatus", "email", "enrollmentId", "experienceLevel", "guardianName", "height", "id", "idCardUrl", "involvedInSports", "medicalConditions", "name", "photoUrl", "purpose", "thigh", "waist", "weight", "whatsAppNumber" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_enrollmentId_key" ON "User"("enrollmentId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
