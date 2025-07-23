import TableA from "./table-a";

export default function TableWrapper() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <TableA />
            <div className='bg-white p-4 shadow rounded-md text-black'>
                <h2 className='text-lg font-semibold mb-2'>League B</h2>
                <p>Table goes here</p>
            </div>
        </div>
    );
}
