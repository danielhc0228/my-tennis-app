import MatchForm from "@/components/match-form";
import db from "@/lib/db";
import { getAllPlayers, getMatches } from "@/lib/prismaFunctions";

export default async function Friendly() {
    const players = await getAllPlayers();
    const matches = await getMatches();
    const config = await db.config.findUnique({
        where: { key: "CURRENT_SEASON" },
    });
    const currentSeason = parseInt(config?.value ?? "1", 10);

    return (
        <div className=' mx-auto px-4 py-8 bg-slate-100 min-h-screen pb-30'>
            <div className='bg-white p-6 rounded-xl shadow-md mt-8'>
                <MatchForm
                    players={players}
                    matches={matches}
                    season={currentSeason}
                    isFriendly={true}
                />
            </div>
        </div>
    );
}
