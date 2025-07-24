import { Suspense } from "react";
import TableA from "./table-a";
import TableB from "./table-b";

export default function TableWrapper() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Suspense fallback={"Loading"}>
                <TableA />
                <TableB />
            </Suspense>
        </div>
    );
}
