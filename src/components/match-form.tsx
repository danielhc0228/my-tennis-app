"use client";

import { submitMatch } from "@/lib/prismaFunctions";
import { useState, useTransition } from "react";

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

interface IMatch {
    player1: {
        name: string;
    };
    player2: {
        name: string;
    };
    player1Id: number;
    player2Id: number;
    player1Score: number;
    player2Score: number;
    id: number;
    winnerId: number;
    season: number;
    matchDate: Date;
}

interface MatchFormProps {
    players: IPlayer[];
    matches: IMatch[];
    season: number;
}

export default function MatchForm({
    players,
    matches,
    season,
}: MatchFormProps) {
    const [player1Id, setPlayer1Id] = useState<number | null>(null);
    const [isPending, setIsPending] = useTransition();
    const [showModal, setShowModal] = useState(false);
    const [newSeason, setNewSeason] = useState<number | null>(null);

    const handleSubmit = (formData: FormData) => {
        setIsPending(async () => {
            const result = await submitMatch(formData);

            if (result?.seasonAdvanced) {
                setNewSeason(result.newSeason);
                setShowModal(true);
            }
        });
    };

    return (
        <form action={handleSubmit}>
            <div className='grid grid-cols-1 gap-4 text-black justify-center'>
                <div className='flex gap-5 items-center'>
                    <select
                        name='player1Id'
                        className='p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2'
                        onChange={(e) => setPlayer1Id(Number(e.target.value))}
                        required
                    >
                        <option value=''>Player 1</option>
                        {players
                            .filter(
                                (p) =>
                                    p.seasonWins + p.seasonLosses !==
                                    players.length - 1
                            )
                            .map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                    </select>
                    <h1>{"VS"}</h1>

                    <select
                        name='player2Id'
                        className='p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2'
                        required
                    >
                        <option value=''>Player 2</option>
                        {players
                            .filter((p) => p.id !== player1Id)
                            .filter(
                                (p) =>
                                    p.seasonWins + p.seasonLosses !==
                                    players.length - 1
                            )
                            .filter((p) => {
                                return !matches.some(
                                    (m) =>
                                        (m.season === season &&
                                            m.player1Id === player1Id &&
                                            m.player2Id === p.id) ||
                                        (m.player1Id === p.id &&
                                            m.player2Id === player1Id)
                                );
                            })
                            .map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className='flex gap-10 items-center'>
                    <input
                        name='player1Score'
                        type='number'
                        placeholder='P1 Score'
                        className='p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2'
                        min={0}
                        max={7}
                        required
                    />
                    <h1>{" : "}</h1>
                    <input
                        name='player2Score'
                        type='number'
                        placeholder='P2 Score'
                        className='p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2'
                        min={0}
                        max={7}
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition px-4 py-3'
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit Match"}
                </button>

                {showModal && (
                    <div
                        onClick={() => setShowModal(false)}
                        className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center'
                    >
                        <div className='w-3/4 h-1/5 bg-green-400 text-white px-6 py-4 rounded-lg shadow-lg cursor-pointer text-center text-2xl flex items-center justify-center z-50'>
                            🎉 Season {newSeason! - 1} is finished! Season{" "}
                            {newSeason} commence!
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}
