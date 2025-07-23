import db from "./db";

export async function getAPlayers() {
    const players = await db.player.findMany({
        where: {
            league: "A",
        },
        select: {
            seasonWins: true,
            seasonLosses: true,
            name: true,
        },
    });

    return players;
}

export async function getBPlayers() {
    const players = await db.player.findMany({
        where: {
            league: "B",
        },
        select: {
            seasonWins: true,
            seasonLosses: true,
            name: true,
        },
    });

    return players;
}
