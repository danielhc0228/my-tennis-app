import MatchForm from "@/components/match-form";
import TableB from "@/components/table-b";
import { getBPlayers } from "@/lib/prismaFunctions";

export default async function LeagueB() {
    const players = await getBPlayers();

    return (
        <div className='max-w-4xl mx-auto px-4 py-8 bg-slate-100 min-h-screen'>
            <h1 className='text-3xl font-bold mb-6 text-center text-blue-800'>
                League B
            </h1>

            <div className='bg-white p-6 rounded-xl shadow-md mb-8'>
                <MatchForm players={players} />
            </div>
            <TableB />
        </div>
    );
}
