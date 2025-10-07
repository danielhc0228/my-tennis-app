import TableA from "@/components/table-a";
// import TableB from "@/components/table-b";

export default function HomePage() {
    return (
        <div className='relative min-h-screen p-4 bg-slate-100'>
            {/* Header Section */}
            <div className='flex justify-between items-center mb-4'>
                <div className='text-xl font-bold text-black'>HTP League</div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-30'>
                <TableA />
                {/* <TableB /> */}
            </div>
        </div>
    );
}
