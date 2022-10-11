import {FC, useMemo} from 'react';
import { Cell } from '../../../../model/cell';
import { Project } from '../../../../model/project';
import { Row, RowH } from './row';

type TableT = {
    rows: number;
    cells: number;
    project: Project;
};

const getRows = (rows: number, cells: number, project: Project)=>{
    const _rows = [];
    for (let i = 0; i < rows; i++)
    {
        const row: Cell[] = [];
        for (let j = 0; j < cells; j++)
            row.push(project.addCell(new Cell(i, String.fromCharCode(65+j/26))));
        _rows.push(row);
    }
    return _rows;
}

export const Table: FC<TableT> = ({rows, cells, project})=>{

    const _rows = useMemo(()=>getRows(rows, cells, project), [rows, cells, project]);
    const rowsComp = _rows.map((r, i)=><Row key={i} cells={r}/>);

    return <table>
        <thead>
            <RowH cells={cells}/>
        </thead>
        <tbody>
            {rowsComp}
        </tbody>
    </table>;
}


