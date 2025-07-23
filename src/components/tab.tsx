import Link from "next/link";

export default function Tab() {
    return (
        <div className='absolute top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-8'>
            <div className='flex flex-col space-y-4'>
                <Link href={"/"}>
                    <h1 className='text-gray-700 hover:text-blue-500'>
                        Overview
                    </h1>
                </Link>
                <Link href={"/league-a"}>
                    <h1 className='text-gray-700 hover:text-blue-500'>
                        League A
                    </h1>
                </Link>
                <Link href={"/league-b"}>
                    <h1 className='text-gray-700 hover:text-blue-500'>
                        League B
                    </h1>
                </Link>
                <Link href={"/matches"}>
                    <h1 className='text-gray-700 hover:text-blue-500'>
                        Matches
                    </h1>
                </Link>
            </div>
        </div>
    );
}
