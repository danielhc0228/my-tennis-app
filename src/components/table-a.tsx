import { Player } from "@prisma/client";
import { getAPlayers } from "../lib/prismaFunctions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default async function TableA() {
    const aPlayers: Player[] = await getAPlayers();

    return (
        <div className='bg-white p-6 rounded-xl shadow-md text-black'>
            <h2 className='text-2xl font-semibold mb-4 text-blue-700'>
                Standings
            </h2>

            <table className='w-full table-auto'>
                <thead>
                    <tr className='bg-blue-100 text-blue-900 text-left text-sm uppercase tracking-wider'>
                        <th className='p-3'>Rank</th>
                        <th className='p-3'>Name</th>
                        <th className='p-3'>Match Results</th>
                    </tr>
                </thead>

                <tbody>
                    {aPlayers.map((player, index: number) => {
                        const totalMatches = 4;
                        const wins = player.seasonWins;
                        const losses = player.seasonLosses;
                        const unplayed = totalMatches - (wins + losses);

                        const resultIcons = [
                            ...Array(wins).fill("win"),
                            ...Array(losses).fill("loss"),
                            ...Array(unplayed).fill("unplayed"),
                        ];

                        return (
                            <tr
                                key={player.id}
                                className={`hover:bg-gray-100 transition ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className='p-3 font-medium text-center'>
                                    {index + 1}
                                </td>
                                <td className='p-3 font-semibold'>
                                    {player.name}
                                </td>
                                <td className='p-3'>
                                    <div className='flex gap-2'>
                                        {resultIcons.map((result, i) => (
                                            <div
                                                key={i}
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow
                                                    ${
                                                        result === "win"
                                                            ? "bg-green-500 text-white"
                                                            : ""
                                                    }
                                                    ${
                                                        result === "loss"
                                                            ? "bg-red-500 text-white"
                                                            : ""
                                                    }
                                                    ${
                                                        result === "unplayed"
                                                            ? "bg-gray-300"
                                                            : ""
                                                    }
                                                `}
                                            >
                                                {result === "win" && (
                                                    <CheckIcon className='w-4 h-4' />
                                                )}
                                                {result === "loss" && (
                                                    <XMarkIcon className='w-4 h-4' />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
