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
            <div className='flex gap-4 items-center mb-4'>
                <select
                    name='player1Id'
                    className='border rounded p-2'
                    onChange={(e) => setPlayer1Id(Number(e.target.value))}
                    required
                >
                    <option value=''>Select Player 1</option>
                    {players.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>

                <select
                    name='player2Id'
                    className='border rounded p-2'
                    required
                >
                    <option value=''>Select Player 2</option>
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
                    className='w-20 border rounded p-2'
                    required
                />
                <input
                    name='player2Score'
                    type='number'
                    placeholder='P2 Score'
                    className='w-20 border rounded p-2'
                    required
                />
                <input type={"hidden"} name='season' value={players.season} />

                <button
                    type='submit'
                    className='bg-blue-600 text-white px-4 py-2 rounded'
                >
                    Submit Match
                </button>
            </div>
        </form>
    );
}
