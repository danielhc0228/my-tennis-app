-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "league" TEXT NOT NULL,
    "seasonWins" INTEGER NOT NULL DEFAULT 0,
    "seasonLosses" INTEGER NOT NULL DEFAULT 0,
    "totalWins" INTEGER NOT NULL DEFAULT 0,
    "totalLosses" INTEGER NOT NULL DEFAULT 0,
    "seasonPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "power" INTEGER NOT NULL DEFAULT 0,
    "serve" INTEGER NOT NULL DEFAULT 0,
    "accuracy" INTEGER NOT NULL DEFAULT 0,
    "agility" INTEGER NOT NULL DEFAULT 0,
    "volley" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Player" ("createdAt", "id", "league", "name", "seasonLosses", "seasonPoints", "seasonWins", "totalLosses", "totalWins") SELECT "createdAt", "id", "league", "name", "seasonLosses", "seasonPoints", "seasonWins", "totalLosses", "totalWins" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
