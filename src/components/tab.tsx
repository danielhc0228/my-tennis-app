"use client";

import {
    HomeIcon as SolidHomeIcon,
    TrophyIcon as SolidTrophyIcon,
    ClipboardDocumentListIcon as SolidClipboardDocumentListIcon,
    UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as OutlineHomeIcon,
    TrophyIcon as OutlineTrophyIcon,
    ClipboardDocumentListIcon as OutlineClipboardDocumentListIcon,
    UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
    const pathname = usePathname();
    return (
        <div className='fixed bottom-0 mx-auto grid w-full grid-cols-5 border-t border-neutral-200 bg-white px-5 py-3'>
            <Link
                href='/'
                className={`flex flex-col items-center gap-0.5 ${
                    pathname === "/" ? "text-blue-600" : "text-neutral-500"
                }`}
            >
                {pathname === "/" ? (
                    <SolidHomeIcon className='h-7 w-7' />
                ) : (
                    <OutlineHomeIcon className='h-7 w-7' />
                )}
                <span className='text-sm font-medium'>Overview</span>
            </Link>
            <Link
                href='/league-a'
                className={`flex flex-col items-center gap-0.5 ${
                    pathname === "/league-a"
                        ? "text-blue-600"
                        : "text-neutral-500"
                }`}
            >
                {pathname === "/league-a" ? (
                    <SolidTrophyIcon className='h-7 w-7' />
                ) : (
                    <OutlineTrophyIcon className='h-7 w-7' />
                )}
                <span>League A</span>
            </Link>
            <Link
                href='/league-b'
                className={`flex flex-col items-center gap-0.5 ${
                    pathname === "/league-b"
                        ? "text-blue-600"
                        : "text-neutral-500"
                }`}
            >
                {pathname === "/league-b" ? (
                    <SolidTrophyIcon className='h-7 w-7' />
                ) : (
                    <OutlineTrophyIcon className='h-7 w-7' />
                )}
                <span>League B</span>
            </Link>
            <Link
                href='/matches'
                className={`flex flex-col items-center gap-0.5 ${
                    pathname === "/matches"
                        ? "text-blue-600"
                        : "text-neutral-500"
                }`}
            >
                {pathname === "/matches" ? (
                    <SolidClipboardDocumentListIcon className='h-7 w-7' />
                ) : (
                    <OutlineClipboardDocumentListIcon className='h-7 w-7' />
                )}
                <span>Matches</span>
            </Link>
            <Link
                href='/profile'
                className={`flex flex-col items-center gap-0.5 ${
                    pathname === "/profile"
                        ? "text-blue-600"
                        : "text-neutral-500"
                }`}
            >
                {pathname === "/profile" ? (
                    <SolidUserIcon className='h-7 w-7' />
                ) : (
                    <OutlineUserIcon className='h-7 w-7' />
                )}
                <span>Profile</span>
            </Link>
        </div>
    );
}
