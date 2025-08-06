import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const currentSeason = await prisma.config.upsert({
        create: {
            key: "CURRENT_SEASON",
            value: "1",
        },
        where: { key: "CURRENT_SEASON" },
        update: {},
    });

    const p1 = await prisma.player.upsert({
        create: {
            name: "D.CHUNG",
            league: "A",
            power: 7,
            serve: 9,
            accuracy: 8,
            agility: 6,
            volley: 5,
        },
        where: { id: 1 },
        update: {},
    });
    const p2 = await prisma.player.upsert({
        create: {
            name: "Y.KIM",
            league: "A",
            power: 7,
            serve: 7,
            accuracy: 6,
            agility: 8,
            volley: 6,
        },
        where: { id: 2 },
        update: {},
    });
    const p3 = await prisma.player.upsert({
        create: {
            name: "K.HWANG",
            league: "A",
            power: 6,
            serve: 6,
            accuracy: 5,
            agility: 8,
            volley: 4,
        },
        where: { id: 3 },
        update: {},
    });
    const p4 = await prisma.player.upsert({
        create: {
            name: "J.CHUNG",
            league: "B",
            power: 4,
            serve: 4,
            accuracy: 6,
            agility: 4,
            volley: 2,
        },
        where: { id: 4 },
        update: {},
    });
    const p5 = await prisma.player.upsert({
        create: {
            name: "S.KANG",
            league: "B",
            power: 9,
            serve: 5,
            accuracy: 3,
            agility: 3,
            volley: 9,
        },
        where: { id: 5 },
        update: {},
    });
    const p6 = await prisma.player.upsert({
        create: {
            name: "Y.YOO",
            league: "B",
            power: 1,
            serve: 4,
            accuracy: 2,
            agility: 4,
            volley: 2,
        },
        where: { id: 6 },
        update: {},
    });

    console.log(currentSeason, p1, p2, p3, p4, p5, p6);
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
