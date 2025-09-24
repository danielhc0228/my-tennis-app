"use client";

import { submitMatch } from "@/lib/prismaFunctions";
import { useEffect, useState, useTransition } from "react";

interface IPlayer {
    id: number;
    name: string;
    league: "A" | "B" | "NOT_AVAILABLE"; // or League enum
    seasonWins: number;
    seasonLosses: number;
    totalWins: number;
    totalLosses: number;
    createdAt: Date;
}

interface LeagueSummary {
    first: IPlayer | null;
    last: IPlayer | null;
}

interface SeasonSummary {
    leagueA: LeagueSummary;
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
    const [isPasswordPending, setIsPasswordPending] = useTransition();
    const [showModal, setShowModal] = useState(false);
    const [newSeason, setNewSeason] = useState<number | null>(null);
    const [seasonSummary, setSeasonSummary] = useState<SeasonSummary | null>(
        null
    );
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState("");

    // For confirmation popup
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [formValues, setFormValues] = useState({
        player1Id: null as number | null,
        player2Id: null as number | null,
        player1Score: null as number | null,
        player2Score: null as number | null,
    });

    useEffect(() => {
        const stored = localStorage.getItem("formUnlocked");
        if (stored === "true") {
            setUnlocked(true);
        }
    }, []);

    const handlePasswordSubmit = async () => {
        setIsPasswordPending(async () => {
            const res = await fetch("/api/verify-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                localStorage.setItem("formUnlocked", "true");
                setUnlocked(true);
            } else {
                alert("Incorrect password");
            }
        });
    };

    if (!unlocked) {
        return (
            <div className='space-y-4'>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter admin password'
                    className='p-2 border rounded w-full text-black border-gray-200'
                />
                <button
                    onClick={handlePasswordSubmit}
                    disabled={isPasswordPending}
                    className={` text-white font-semibold rounded-lg transition px-4 py-3 w-full
        ${
            isPasswordPending
                ? "bg-gray-400  cursor-not-allowed pointer-events-none"
                : "bg-blue-600 hover:bg-blue-700"
        }
    `}
                >
                    {isPasswordPending ? "Submitting..." : "Unlock"}
                </button>
            </div>
        );
    }

    const handleSubmit = (formData: FormData) => {
        setIsPending(async () => {
            const result = await submitMatch(formData);
            setSeasonSummary(result.seasonSummary);

            if (result?.seasonAdvanced) {
                setNewSeason(result.newSeason);
                setShowModal(true);
            }
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setFormValues({
                    player1Id: Number(fd.get("player1Id")),
                    player2Id: Number(fd.get("player2Id")),
                    player1Score: Number(fd.get("player1Score")),
                    player2Score: Number(fd.get("player2Score")),
                });
                setShowConfirmModal(true); // open confirmation popup
            }}
        >
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
                                        (m.season === season &&
                                            m.player1Id === p.id &&
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
                    className={` text-white font-semibold rounded-lg transition px-4 py-3
        ${
            isPending
                ? "bg-gray-400  cursor-not-allowed pointer-events-none"
                : "bg-blue-600 hover:bg-blue-700"
        }
    `}
                    disabled={isPending}
                >
                    {isPending ? "Submitting..." : "Submit Match"}
                </button>

                {showConfirmModal && (
                    <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
                        <div className='bg-white text-black p-6 rounded-lg shadow-lg w-80 text-center'>
                            <h2 className='text-xl font-bold mb-4'>
                                Confirm Match
                            </h2>
                            <p>
                                {
                                    players.find(
                                        (p) => p.id === formValues.player1Id
                                    )?.name
                                }{" "}
                                ({formValues.player1Score}){" vs "}
                                {
                                    players.find(
                                        (p) => p.id === formValues.player2Id
                                    )?.name
                                }{" "}
                                ({formValues.player2Score})
                            </p>
                            <div className='mt-6 flex gap-4 justify-center'>
                                <button
                                    type='button'
                                    onClick={() => {
                                        const fd = new FormData();
                                        fd.append(
                                            "player1Id",
                                            String(formValues.player1Id)
                                        );
                                        fd.append(
                                            "player2Id",
                                            String(formValues.player2Id)
                                        );
                                        fd.append(
                                            "player1Score",
                                            String(formValues.player1Score)
                                        );
                                        fd.append(
                                            "player2Score",
                                            String(formValues.player2Score)
                                        );
                                        handleSubmit(fd); // call your existing submit function
                                        setShowConfirmModal(false);
                                    }}
                                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                                >
                                    Confirm
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmModal(false)}
                                    className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div
                        onClick={() => setShowModal(false)}
                        className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
                    >
                        <div className='w-3/4 bg-green-400 text-white px-6 py-4 rounded-lg shadow-lg cursor-pointer text-center text-2xl flex flex-col gap-4 items-center justify-center'>
                            🎉 Season {newSeason! - 1} is finished!
                            <br />
                            Season {newSeason} commences!
                            <div className='text-lg mt-4'>
                                <p>
                                    <strong>🏆 League A:</strong> 1st -{" "}
                                    {seasonSummary!.leagueA.first?.name}, Last -{" "}
                                    {seasonSummary!.leagueA.last?.name}
                                </p>
                            </div>
                            <p className='text-sm mt-2'>
                                (Click anywhere to close)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}
