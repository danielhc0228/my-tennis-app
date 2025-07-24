// app/components/TableA.tsx
import { Player } from "@prisma/client";
import { getBPlayers } from "../../lib/prismaFunctions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default async function TableB() {
    const aPlayers: Player[] = await getBPlayers();

    return (
        <div className='bg-white p-4 shadow rounded-md text-black'>
            <h2 className='text-lg font-semibold mb-2'>League B</h2>

            <table className='w-full table-auto border'>
                <thead>
                    <tr className='bg-gray-100 text-left'>
                        <th className='p-2'>Rank</th>
                        <th className='p-2'>Name</th>
                        <th className='p-2'>Matches</th>
                    </tr>
                </thead>
                <tbody>
                    {aPlayers.map((player, index: number) => {
                        const totalMatches = 4;
                        const wins = player.seasonWins;
                        const losses = player.seasonLosses;
                        const unplayed = totalMatches - (wins + losses);

                        // Create result icons array
                        const resultIcons = [
                            ...Array(wins).fill("win"),
                            ...Array(losses).fill("loss"),
                            ...Array(unplayed).fill("unplayed"),
                        ];

                        return (
                            <tr
                                key={player.id}
                                className={
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }
                            >
                                <td className='p-2'>{index + 1}</td>
                                <td className='p-2'>{player.name}</td>
                                <td className='p-2'>
                                    <div className='flex gap-2'>
                                        {resultIcons.map((result, i) => (
                                            <div
                                                key={i}
                                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
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
                                                            ? "bg-gray-200"
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
