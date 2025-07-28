import MatchForm from "@/components/match-form";
import TableA from "@/components/table-a";
import { getAPlayers } from "@/lib/prismaFunctions";

export default async function LeagueA() {
    const players = await getAPlayers();

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6 text-center text-blue-800'>
                League A
            </h1>

            <div className='bg-white p-6 rounded-xl shadow-md mb-8'>
                <MatchForm players={players} />
            </div>

            <TableA />
        </div>
    );
}
