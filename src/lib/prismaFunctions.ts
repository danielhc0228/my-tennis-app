"use server";

import { revalidatePath } from "next/cache";
import { League } from "@prisma/client";
import db from "./db";

export async function getAPlayers() {
    const players = await db.player.findMany({
        where: {
            league: League.A,
        },
        orderBy: [{ seasonWins: "desc" }, { seasonPoints: "desc" }],
    });

    return players;
}
export async function getBPlayers() {
    const players = await db.player.findMany({
        where: {
            league: League.B,
        },
        orderBy: [{ seasonWins: "desc" }, { seasonPoints: "desc" }],
    });

    return players;
}

export async function getMatches() {
    const matches = await db.match.findMany({
        include: {
            player1: {
                select: {
                    name: true,
                },
            },
            player2: {
                select: {
                    name: true,
                },
            },
        },
    });

    return matches;
}

export async function shouldIncrementSeason(currentSeason: number) {
    const aPlayers = await db.player.findMany({
        where: {
            league: "A",
        },
    });
    const expectedAMatches = (aPlayers.length * (aPlayers.length - 1)) / 2;
    const playedMatches = await db.match.count({
        where: {
            season: currentSeason,
            player1: { league: "A" },
            player2: { league: "A" },
        },
    });
    if (playedMatches < expectedAMatches) {
        return false; // Not all matches are played in both leaguess
    }

    return true; // All leagues completed
}

export async function submitMatch(formData: FormData) {
    const player1Id = Number(formData.get("player1Id"));
    const player2Id = Number(formData.get("player2Id"));
    const player1Score = Number(formData.get("player1Score"));
    const player2Score = Number(formData.get("player2Score"));

    const winnerId = player1Score > player2Score ? player1Id : player2Id;

    const config = await db.config.findUnique({
        where: { key: "CURRENT_SEASON" },
    });
    const currentSeason = parseInt(config?.value ?? "1", 10);

    await db.match.create({
        data: {
            player1Id,
            player2Id,
            player1Score,
            player2Score,
            winnerId,
            season: currentSeason, // use context or constant
        },
    });

    // Update player stats (wins/losses)
    if (player1Score > player2Score) {
        await db.player.update({
            where: { id: player1Id },
            data: {
                seasonWins: { increment: 1 },
                totalWins: { increment: 1 },
                seasonPoints: { increment: player1Score },
            },
        });
        await db.player.update({
            where: { id: player2Id },
            data: {
                seasonLosses: { increment: 1 },
                totalLosses: { increment: 1 },
                seasonPoints: { increment: player2Score },
            },
        });
    } else {
        await db.player.update({
            where: { id: player2Id },
            data: {
                seasonWins: { increment: 1 },
                totalWins: { increment: 1 },
                seasonPoints: { increment: player2Score },
            },
        });
        await db.player.update({
            where: { id: player1Id },
            data: {
                seasonLosses: { increment: 1 },
                totalLosses: { increment: 1 },
                seasonPoints: { increment: player1Score },
            },
        });
    }

    revalidatePath("/league-a");
    revalidatePath("/matches");
    revalidatePath("/");

    let seasonAdvanced = false;
    let newSeason = null;
    const readyToAdvance = await shouldIncrementSeason(currentSeason);
    const summary = await getSeasonSummary();

    if (readyToAdvance) {
        await db.config.update({
            where: { key: "CURRENT_SEASON" },
            data: { value: String(currentSeason + 1) },
        });

        console.log("Season incremented to", currentSeason + 1);

        await db.player.updateMany({
            data: {
                seasonWins: 0,
                seasonLosses: 0,
                seasonPoints: 0,
            },
        });

        seasonAdvanced = true;
        newSeason = currentSeason + 1;

        await db.season.create({
            data: {
                number: currentSeason,
                winnerAId: summary.leagueA.first.id,
                loserAId: summary.leagueA.last.id,
            },
        });

        revalidatePath("/league-a");
        revalidatePath("/matches");
        revalidatePath("/");
    }

    return { success: true, seasonAdvanced, newSeason, seasonSummary: summary };
}

export async function getSeasonSummary() {
    const aPlayers = await getAPlayers();

    return {
        leagueA: {
            first: aPlayers[0] ?? null,
            last: aPlayers[aPlayers.length - 1] ?? null,
        },
    };
}

export async function getSeasonWinnerLoser() {
    const result = await db.season.findMany({
        include: {
            winnerA: true,
            loserA: true,
        },
    });

    return result;
}
