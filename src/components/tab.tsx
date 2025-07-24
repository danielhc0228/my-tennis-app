"use client";

import {
    HomeIcon as SolidHomeIcon,
    TrophyIcon as SolidTrophyIcon,
    ClipboardDocumentListIcon as SolidClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as OutlineHomeIcon,
    TrophyIcon as OutlineTrophyIcon,
    ClipboardDocumentListIcon as OutlineClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
    const pathname = usePathname();
    return (
        <div className='fixed bottom-0 mx-auto grid w-full max-w-screen-sm grid-cols-4 border-t border-neutral-600 bg-neutral-800 px-5 py-3 *:text-white'>
            <Link href='/' className='flex flex-col items-center gap-px'>
                {pathname === "/" ? (
                    <SolidHomeIcon className='h-7 w-7' />
                ) : (
                    <OutlineHomeIcon className='h-7 w-7' />
                )}
                <span>Overview</span>
            </Link>
            <Link
                href='/league-a'
                className='flex flex-col items-center gap-px'
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
                className='flex flex-col items-center gap-px'
            >
                {pathname === "/league-b" ? (
                    <SolidTrophyIcon className='h-7 w-7' />
                ) : (
                    <OutlineTrophyIcon className='h-7 w-7' />
                )}
                <span>League B</span>
            </Link>
            <Link href='/matches' className='flex flex-col items-center gap-px'>
                {pathname === "/matches" ? (
                    <SolidClipboardDocumentListIcon className='h-7 w-7' />
                ) : (
                    <OutlineClipboardDocumentListIcon className='h-7 w-7' />
                )}
                <span>Matches</span>
            </Link>
            {/* <Link href='/profile' className='flex flex-col items-center gap-px'>
                {pathname === "/profile" ? (
                    <SolidUserIcon className='h-7 w-7' />
                ) : (
                    <OutlineUserIcon className='h-7 w-7' />
                )}
                <span>Profile</span>
            </Link> */}
        </div>
    );
}
