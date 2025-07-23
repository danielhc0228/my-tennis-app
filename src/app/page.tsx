// HomePage.tsx
"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
    const [showTab, setShowTab] = useState(false);
    const [activeView, setActiveView] = useState("overview"); // leagueA, leagueB, matches...

    return (
        <div className='relative min-h-screen p-4 bg-blue-950'>
            {/* Header Section */}
            <div className='flex justify-between items-center mb-4'>
                <div className='text-xl font-bold text-black'>
                    Tennis League
                </div>

                <button onClick={() => setShowTab(!showTab)}>
                    {showTab ? (
                        <XMarkIcon className='size-6 text-gray-700' />
                    ) : (
                        <Bars3Icon className='size-6 text-gray-700' />
                    )}
                </button>
            </div>

            {/* Side Tab Panel */}
            {showTab && (
                <div className='absolute top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-4'>
                    <button
                        onClick={() => {
                            setShowTab(false);
                        }}
                    >
                        <XMarkIcon className='absolute right-5 size-6 top-5 text-gray-700' />
                    </button>

                    <div className='flex flex-col space-y-4'>
                        <button
                            className='text-left text-gray-700 hover:text-blue-500'
                            onClick={() => {
                                setActiveView("overview");
                                setShowTab(false);
                            }}
                        >
                            Overview
                        </button>
                        <button
                            className='text-left text-gray-700 hover:text-blue-500'
                            onClick={() => {
                                setActiveView("leagueA");
                                setShowTab(false);
                            }}
                        >
                            League A
                        </button>
                        <button
                            className='text-left text-gray-700 hover:text-blue-500'
                            onClick={() => {
                                setActiveView("leagueB");
                                setShowTab(false);
                            }}
                        >
                            League B
                        </button>
                        <button
                            className='text-left text-gray-700 hover:text-blue-500'
                            onClick={() => {
                                setActiveView("matches");
                                setShowTab(false);
                            }}
                        >
                            Matches
                        </button>
                    </div>
                </div>
            )}

            {/* Content Display */}
            <div className='mt-8'>
                {activeView === "overview" && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <LeagueTable title='League A' />
                        <LeagueTable title='League B' />
                    </div>
                )}

                {activeView === "leagueA" && <LeagueTable title='League A' />}
                {activeView === "leagueB" && <LeagueTable title='League B' />}
                {activeView === "matches" && <MatchesTable />}
            </div>
        </div>
    );
}

// Dummy Component Examples
const LeagueTable = ({ title }: { title: string }) => (
    <div className='bg-white p-4 shadow rounded-md text-black'>
        <h2 className='text-lg font-semibold mb-2'>{title}</h2>
        <p>Table goes here</p>
    </div>
);

const MatchesTable = () => (
    <div className='bg-white p-4 shadow rounded-md text-black'>
        <h2 className='text-lg font-semibold mb-2'>Matches</h2>
        <p>Match list goes here</p>
    </div>
);
