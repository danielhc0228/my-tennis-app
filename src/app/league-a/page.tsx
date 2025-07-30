import MatchForm from "@/components/match-form";
import TableA from "@/components/table-a";
import db from "@/lib/db";
import { getAPlayers, getMatches } from "@/lib/prismaFunctions";

export default async function LeagueA() {
    const players = await getAPlayers();
    const matches = await getMatches();
    const config = await db.config.findUnique({
        where: { key: "CURRENT_SEASON" },
    });
    const currentSeason = parseInt(config?.value ?? "1", 10);

    return (
        <div className=' mx-auto px-4 py-8 bg-slate-100 min-h-screen pb-30'>
            <h1 className='text-3xl font-bold mb-6 text-center text-blue-900'>
                {`Season ${currentSeason}`}
            </h1>
            <TableA />
            <div className='bg-white p-6 rounded-xl shadow-md mt-8'>
                <MatchForm
                    players={players}
                    matches={matches}
                    season={currentSeason}
                />
            </div>
        </div>
    );
}
