import {FC} from 'react';
import { Row, RowH } from './row';

type TableT = {
    rows: number;
    cells: number;
};

export const Table: FC<TableT> = ({rows, cells})=>{
    const rowsComp = [];
    for (let i = 0; i < rows; i++)
        rowsComp.push(<Row cells={cells} />);

    return <table>
        <thead>
            <RowH cells={cells}/>
        </thead>
        <tbody>
            {rowsComp}
        </tbody>
    </table>;
}


