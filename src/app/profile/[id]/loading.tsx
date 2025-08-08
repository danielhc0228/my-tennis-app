export default function Loading() {
    return (
        <div className='min-h-[150vh] bg-gradient-to-br from-purple-100 to-indigo-100 p-8 animate-pulse'>
            <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8'>
                <div className='flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-start'>
                    <div className='w-36 h-36 rounded-full bg-gray-300 shadow-md' />

                    <div className='flex-1 space-y-4'>
                        <div className='h-8 bg-gray-300 rounded w-1/2 mx-auto md:mx-0' />

                        <div className='inline-block px-4 py-2 bg-gray-200 rounded-full w-32 mx-auto md:mx-0' />

                        <div className='h-5 bg-gray-200 rounded w-40 mx-auto md:mx-0 mt-4' />
                        <div className='h-5 bg-gray-200 rounded w-24 mx-auto md:mx-0' />
                    </div>
                </div>

                <div className='mt-6 grid grid-cols-2 gap-6 text-center'>
                    <div>
                        <div className='h-6 bg-gray-300 rounded w-12 mx-auto mb-1' />
                        <p className='text-sm text-gray-400'>Total Wins</p>
                    </div>
                    <div>
                        <div className='h-6 bg-gray-300 rounded w-12 mx-auto mb-1' />
                        <p className='text-sm text-gray-400'>Total Losses</p>
                    </div>
                    <div className='col-span-2'>
                        <div className='h-6 bg-gray-300 rounded w-20 mx-auto mb-1' />
                        <p className='text-sm text-gray-400'>Win Rate</p>
                    </div>
                </div>

                <div className='mt-10 h-72 bg-gray-200 rounded-lg' />
            </div>
        </div>
    );
}
