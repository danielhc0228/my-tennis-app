// app/loading.tsx

export default function Loading() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-slate-100 text-blue-900'>
            <div className='text-xl font-semibold animate-pulse'>
                Loading...
            </div>
        </div>
    );
}
