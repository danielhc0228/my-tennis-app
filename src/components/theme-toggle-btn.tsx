"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-all'
            title='Toggle theme'
        >
            {theme === "light" ? (
                <MoonIcon width={20} height={20} className='text-gray-800' />
            ) : (
                <SunIcon width={20} height={20} className='text-yellow-400' />
            )}
        </button>
    );
}
