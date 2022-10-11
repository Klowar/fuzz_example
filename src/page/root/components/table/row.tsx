import {FC} from 'react';
import { Cell as CellM } from '../../../../model/cell';
import { Cell, CellH } from './cell';

type RowT = {
    cells: CellM[];
}

export const Row: FC<RowT> = ({cells})=>{

    const cellComps = cells.map(c=><Cell key={c.getHash()} cell={c}/>);

    return <tr>
        {cellComps}
    </tr>;
}

type RowHT = {
    cells: number;
}

export const RowH: FC<RowHT> = ({cells})=>{
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

