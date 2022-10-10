import {FC} from 'react';
import { Cell, CellH } from './cell';

type RowT = {
    cells: number;
}

export const Row: FC<RowT> = ({cells})=>{
    const cellComps = [];
    for(let i = 0; i < cells; i++)
        cellComps.push(<Cell />);

    return <tr>
        {cellComps}
    </tr>;
}

export const RowH: FC<RowT> = ({cells})=>{
    const cellComps = [];
    for(let i = 0; i < cells; i++){
        let prefix = i > 26 ? String.fromCharCode(65+i/26) : '';
        let text = prefix + String.fromCharCode(65+i%26);
        cellComps.push(<CellH text={text} />);
    }

    return <tr>
        {cellComps}
    </tr>
}

