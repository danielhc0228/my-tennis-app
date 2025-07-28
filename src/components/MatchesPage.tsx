"use client";

import { useState, useEffect } from "react";

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

export default function MatchesPage({ allMatches }: { allMatches: IMatch[] }) {
    const [season, setSeason] = useState<number>(1); // default season
    const [filtered, setFiltered] = useState<IMatch[]>([]);

    useEffect(() => {
        setFiltered(allMatches.filter((match) => match.season === season));
    }, [season, allMatches]);

    const seasons = Array.from(
        new Set(allMatches.map((match) => match.season))
    ).sort((a, b) => b - a); // descending

    return (
        <div className='flex flex-col bg-slate-100 min-h-screen text-gray-900'>
            <div className='m-6 bg-white shadow-md rounded-xl px-5 py-3 flex items-center gap-4'>
                <label
                    htmlFor='season-select'
                    className='text-gray-700 text-base font-semibold'
                >
                    Select Season
                </label>
                <select
                    id='season-select'
                    value={season}
                    onChange={(e) => setSeason(Number(e.target.value))}
                    className='border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    {seasons.map((s) => (
                        <option key={s} value={s}>
                            {`Season ${s}`}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render filtered matches */}
            <table className='mt-4 w-full'>
                <tbody>
                    {filtered.map((match) => {
                        const aWon = match.player1Score > match.player2Score;
                        const bWon = match.player2Score > match.player1Score;

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
                                    <div className='text-gray-500 text-xs'>
                                        {new Date(
                                            match.matchDate
                                        ).toLocaleDateString()}
                                    </div>
                                    {match.player1Score} - {match.player2Score}
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
    );
}
