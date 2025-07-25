import MatchForm from "@/components/match-form";
import TableA from "@/components/table-a";
import { getAPlayers } from "@/lib/prismaFunctions";

export default async function LeagueA() {
    const players = await getAPlayers();

    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>League A</h1>
            <MatchForm players={players} />
            <TableA />
        </div>
    );
}
