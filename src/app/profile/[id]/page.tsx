import PlayerRadarChart from "@/components/radar-chart";
import db from "@/lib/db";
import Image from "next/image";

export default async function ProfileDetail(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const id = Number(params.id);
    const player = await db.player.findUnique({
        where: { id },
    });

    if (!player) {
        return (
            <div className='min-h-screen flex items-center justify-center text-2xl text-red-600'>
                Player not found.
            </div>
        );
    }

    const totalGames = player.totalWins + player.totalLosses;
    const winRate =
        totalGames > 0
            ? ((player.totalWins / totalGames) * 100).toFixed(1)
            : "N/A";

    return (
        <div className='min-h-[150vh] bg-gradient-to-br from-purple-100 to-indigo-100 p-8'>
            <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8'>
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-start'>
                    <Image
                        priority={true}
                        src={`/${player.name}.svg`}
                        alt={player.name}
                        className='w-36 h-36 rounded-full shadow-md'
                        width={25}
                        height={25}
                    />
                    <div className='flex-1'>
                        <div>
                            <h1 className='text-3xl font-bold text-indigo-800 mb-2'>
                                {player.name}
                            </h1>

                            <span
                                className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
                                    player.league === "A"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                League {player.league}
                            </span>

                            <p className='mt-4 text-gray-600'>
                                {/* {player.description ||  */}
                                {"No description provided."}
                            </p>
                        </div>

                        <div className='mt-6 grid grid-cols-2 gap-6 text-center'>
                            <div>
                                <p className='text-xl font-semibold text-gray-800'>
                                    {player.totalWins}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    Total Wins
                                </p>
                            </div>
                            <div>
                                <p className='text-xl font-semibold text-gray-800'>
                                    {player.totalLosses}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    Total Losses
                                </p>
                            </div>
                            <div className='col-span-2'>
                                <p className='text-xl font-semibold text-indigo-700'>
                                    {winRate === "N/A" ? "N/A" : `${winRate}%`}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    Win Rate
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <PlayerRadarChart
                    power={player.power}
                    serve={player.serve}
                    accuracy={player.accuracy}
                    volley={player.volley}
                    agility={player.agility}
                />
            </div>
        </div>
    );
}
