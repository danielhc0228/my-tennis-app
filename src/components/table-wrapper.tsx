import TableA from "./table-a";
import TableB from "./table-b";

export default function TableWrapper() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <TableA />
            <TableB />
        </div>
    );
}
