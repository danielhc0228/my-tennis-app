// app/components/TableA.tsx
import { Player } from "@/generated/prisma";
import { getBPlayers } from "../../lib/prismaFunctions";

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
                        <th className='p-2'>Wins</th>
                        <th className='p-2'>Losses</th>
                    </tr>
                </thead>
                <tbody>
                    {aPlayers.map((player, index: number) => (
                        <tr
                            key={player.id}
                            className={
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                        >
                            <td className='p-2'>{index + 1}</td>
                            <td className='p-2'>{player.name}</td>
                            <td className='p-2'>{player.seasonWins}</td>
                            <td className='p-2'>{player.seasonLosses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
