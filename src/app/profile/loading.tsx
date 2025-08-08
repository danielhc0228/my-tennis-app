export default function Loading() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 p-10 animate-pulse'>
            <h1 className='text-4xl font-bold text-center text-indigo-800 mb-10'>
                Player Profiles
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16'>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className='bg-white p-6 rounded-xl shadow-lg flex items-center gap-8'
                    >
                        <div className='w-24 h-24 rounded-full bg-gray-300 mb-4' />
                        <div className='flex-1 space-y-2'>
                            <div className='h-6 bg-gray-300 rounded w-3/4' />
                            <div className='h-4 bg-gray-200 rounded w-1/2' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
