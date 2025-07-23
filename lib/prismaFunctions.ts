import { League } from "@/generated/prisma";
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
