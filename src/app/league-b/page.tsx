import MatchForm from "@/components/match-form";
import TableB from "@/components/table-b";
import { getBPlayers } from "@/lib/prismaFunctions";

export default async function LeagueB() {
    const players = await getBPlayers();

    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>League A</h1>
            <MatchForm players={players} />
            <TableB />
        </div>
    );
}
