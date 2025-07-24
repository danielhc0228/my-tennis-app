import { getMatches } from "../../../lib/prismaFunctions";

interface IMatch {
    id: number;
    player1Id: number;
    player2Id: number;
    player1: {
        name: string;
    };
    player2: {
        name: string;
    };
    player1Score: number;
    player2Score: number;
    winnerId: number;
    season: number;
    matchDate: Date;
}

export default async function MatchesPage() {
    const matches: IMatch[] = await getMatches();

    // Optional: Filter by season if you have a season ID
    // const currentSeasonId = ...;
    // const filteredMatches = matches.filter(m => m.seasonId === currentSeasonId);

    return (
        <div className='p-6 text-white'>
            <h1 className='text-2xl font-bold mb-4'>Past Matches</h1>

            <div className='overflow-x-auto'>
                <table className='w-full border-collapse'>
                    <tbody>
                        {matches.map((match) => {
                            const aWon =
                                match.player1Score > match.player2Score;
                            const bWon =
                                match.player2Score > match.player1Score;

                            return (
                                <tr
                                    key={match.id}
                                    className='border-b border-gray-300'
                                >
                                    {/* Player A side */}
                                    <td className='p-4 text-right w-1/3'>
                                        <div className='flex flex-col items-end'>
                                            <span
                                                className={`font-semibold ${
                                                    aWon
                                                        ? "text-green-600"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {aWon ? "Win" : "Loss"}
                                            </span>
                                            <span>{match.player1.name}</span>
                                        </div>
                                    </td>

                                    {/* Score */}
                                    <td className='p-4 text-center text-lg font-medium w-1/3'>
                                        {match.player1Score} -{" "}
                                        {match.player2Score}
                                    </td>

                                    {/* Player B side */}
                                    <td className='p-4 text-left w-1/3'>
                                        <div className='flex flex-col items-start'>
                                            <span
                                                className={`font-semibold ${
                                                    bWon
                                                        ? "text-green-600"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {bWon ? "Win" : "Loss"}
                                            </span>
                                            <span>{match.player2.name}</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
