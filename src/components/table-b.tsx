// app/components/TableA.tsx
import { Player } from "@prisma/client";
import { getBPlayers } from "../lib/prismaFunctions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default async function TableB() {
    const bPlayers: Player[] = await getBPlayers();

    return (
        <div className='bg-white p-6 rounded-xl shadow-md text-black'>
            <h2 className='text-2xl font-semibold mb-4 text-blue-900'>
                League B
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
                    {bPlayers.map((player, index: number) => {
                        const totalMatches = bPlayers.length - 1;
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
                                className={`transition-colors duration-200 ${
                                    index === 0
                                        ? "border-l-4 border-green-400"
                                        : index === bPlayers.length - 1
                                        ? "border-l-4 border-red-400"
                                        : "bg-white hover:bg-gray-100"
                                }`}
                            >
                                <td className='p-3 text-center'>{index + 1}</td>
                                <td className='p-3'>{player.name}</td>
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
