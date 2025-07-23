"use client";

import Tab from "@/components/tab";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function LeagueTable() {
    const [showTab, setShowTab] = useState(false);
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
            <div className='bg-white p-4 shadow rounded-md text-black'>
                <h2 className='text-lg font-semibold mb-2'>League A</h2>
                <p>Table goes here</p>
            </div>
            {showTab && (
                <>
                    <button
                        onClick={() => {
                            setShowTab(false);
                        }}
                    >
                        <XMarkIcon className='absolute right-5 size-6 top-5 text-gray-700 z-10' />
                    </button>
                    <Tab />
                </>
            )}
        </div>
    );
}
