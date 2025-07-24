import TableA from "@/components/table-a";

export default function LeagueA() {
    return (
        <div className='relative min-h-screen p-4 bg-blue-950'>
            {/* Header Section */}
            <div className='flex justify-between items-center mb-4'>
                <div className='text-xl font-bold text-black'>
                    Tennis League
                </div>
            </div>
            <TableA />
        </div>
    );
}
