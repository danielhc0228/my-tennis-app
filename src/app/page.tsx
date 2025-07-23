// HomePage.tsx
"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function HomePage() {
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
                        <Link href={"/"}>
                            <button className='text-left text-gray-700 hover:text-blue-500'>
                                Overview
                            </button>
                        </Link>
                        <Link href={"/league-a"}>
                            <button className='text-left text-gray-700 hover:text-blue-500'>
                                League A
                            </button>
                        </Link>
                        <Link href={"/league-b"}>
                            <button className='text-left text-gray-700 hover:text-blue-500'>
                                League B
                            </button>
                        </Link>
                        <Link href={"/matches"}>
                            <button className='text-left text-gray-700 hover:text-blue-500'>
                                Matches
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
