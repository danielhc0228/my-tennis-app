"use client";

import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Tab from "@/components/tab";
import TableWrapper from "@/components/table-wrapper";

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
            <TableWrapper />

            {/* Side Tab Panel */}
            {showTab && (
                <>
                    <button
                        onClick={() => {
                            setShowTab(false);
                        }}
                    >
                        <XMarkIcon className='absolute size-8 right-5 top-5 text-gray-700 z-51' />
                    </button>
                    <Tab />
                </>
            )}
        </div>
    );
}
