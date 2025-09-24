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
            dateOfBirth: new Date("2002-02-28"),
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
            dateOfBirth: new Date("1999-10-21"),
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
            dateOfBirth: new Date("2004-06-06"),
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
            dateOfBirth: new Date("2004-12-07"),
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
            dateOfBirth: new Date("1994-07-31"),
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
            dateOfBirth: new Date("2001-12-04"),
        },
        where: { id: 6 },
        update: {},
    });
    const p7 = await prisma.player.upsert({
        create: {
            name: "J.LEE",
            league: "A",
            power: 8,
            serve: 6,
            accuracy: 5,
            agility: 8,
            volley: 2,
            dateOfBirth: new Date("1999-04-07"),
        },
        where: { id: 7 },
        update: {},
    });
    const p8 = await prisma.player.upsert({
        create: {
            name: "D.KIM",
            league: "B",
            power: 6,
            serve: 4,
            accuracy: 5,
            agility: 7,
            volley: 4,
            dateOfBirth: new Date("1999-11-24"),
        },
        where: { id: 8 },
        update: {},
    });
    const p9 = await prisma.player.upsert({
        create: {
            name: "SY.KANG",
            league: "B",
            power: 2,
            serve: 2,
            accuracy: 3,
            agility: 2,
            volley: 2,
            dateOfBirth: new Date("2001-10-20"),
        },
        where: { id: 9 },
        update: {},
    });
    const p10 = await prisma.player.upsert({
        create: {
            name: "M.SON",
            league: "B",
            power: 6,
            serve: 4,
            accuracy: 3,
            agility: 6,
            volley: 2,
            dateOfBirth: new Date("1996-06-01"),
        },
        where: { id: 10 },
        update: {},
    });

    console.log(currentSeason, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10);
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
