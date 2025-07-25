"use server";

import { revalidatePath } from "next/cache";
import { League } from "@prisma/client";
import db from "./db";

export async function getAPlayers() {
    const players = await db.player.findMany({
        where: {
            league: League.A,
        },
        orderBy: { seasonWins: "desc" },
    });

    return players;
}

export async function getBPlayers() {
    const players = await db.player.findMany({
        where: {
            league: League.B,
        },
        orderBy: { seasonWins: "desc" },
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

export async function submitMatch(formData: FormData) {
    const player1Id = Number(formData.get("player1Id"));
    const player2Id = Number(formData.get("player2Id"));
    const player1Score = Number(formData.get("player1Score"));
    const player2Score = Number(formData.get("player2Score"));
    const season = Number(formData.get("season"));

    const winnerId = player1Score > player2Score ? player1Id : player2Id;

    await db.match.create({
        data: {
            player1Id,
            player2Id,
            player1Score,
            player2Score,
            winnerId,
            season: season, // use context or constant
        },
    });

    // Optional: Update player stats (wins/losses)
    if (player1Score > player2Score) {
        await db.player.update({
            where: { id: player1Id },
            data: { seasonWins: { increment: 1 } },
        });
        await db.player.update({
            where: { id: player2Id },
            data: { seasonLosses: { increment: 1 } },
        });
    } else {
        await db.player.update({
            where: { id: player2Id },
            data: { seasonWins: { increment: 1 } },
        });
        await db.player.update({
            where: { id: player1Id },
            data: { seasonLosses: { increment: 1 } },
        });
    }

    revalidatePath("/league/a"); // or b
}
