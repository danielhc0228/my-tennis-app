import TableA from "@/components/table-a";
import { Suspense } from "react";

export default function LeagueTable() {
    return (
        <div className='relative min-h-screen p-4 bg-blue-950'>
            {/* Header Section */}
            <div className='flex justify-between items-center mb-4'>
                <div className='text-xl font-bold text-black'>
                    Tennis League
                </div>
            </div>
            <Suspense fallback={"Loading"}>
                <TableA />
            </Suspense>
        </div>
    );
}
