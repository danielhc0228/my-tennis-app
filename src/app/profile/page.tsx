import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function PlayerProfiles() {
    const players = await db.player.findMany({
        orderBy: [{ league: "asc" }, { name: "asc" }],
    });

    return (
        <div className='min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 p-10'>
            <h1 className='text-4xl font-bold text-center text-indigo-800 mb-10'>
                Player Profiles
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16'>
                {players.map((player) => (
                    <Link
                        href={`/profile/${player.id}`}
                        key={player.id}
                        className='bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex items-center text-center gap-8'
                    >
                        <Image
                            // src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${player.name}`}
                            src={"/avatar.png"}
                            alt={`${player.name}'s avatar`}
                            className='w-24 h-24 rounded-full mb-4'
                            width={25}
                            height={25}
                        />
                        <div>
                            <h2 className='text-xl font-semibold text-gray-800'>
                                {player.name}
                            </h2>
                            <p
                                className={`mt-1 text-sm font-medium ${
                                    player.league === "A"
                                        ? "text-green-600"
                                        : "text-blue-600"
                                }`}
                            >
                                League {player.league}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
