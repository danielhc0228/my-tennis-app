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
