"use client";

import { submitMatch } from "@/lib/prismaFunctions";
import { useState } from "react";

interface IPlayer {
    id: number;
    name: string;
    league: "A" | "B"; // or League enum
    seasonWins: number;
    seasonLosses: number;
    totalWins: number;
    totalLosses: number;
    createdAt: Date;
}

interface MatchFormProps {
    players: IPlayer[];
}

export default function MatchForm({ players }: MatchFormProps) {
    const [player1Id, setPlayer1Id] = useState<number | null>(null);

    return (
        <form action={submitMatch}>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 text-black'>
                <select
                    name='player1Id'
                    className='p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    onChange={(e) => setPlayer1Id(Number(e.target.value))}
                    required
                >
                    <option value=''>Player 1</option>
                    {players.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <select
                    name='player2Id'
                    className='p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                >
                    <option value=''>Player 2</option>
                    {players
                        .filter((p) => p.id !== player1Id)
                        .map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                </select>

                <input
                    name='player1Score'
                    type='number'
                    placeholder='P1 Score'
                    className='p-3 border rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    name='player2Score'
                    type='number'
                    placeholder='P2 Score'
                    className='p-3 border rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />

                <button
                    type='submit'
                    className='bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition px-4 py-3'
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
