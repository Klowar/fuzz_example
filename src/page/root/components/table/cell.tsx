import {FC} from 'react';
import { Cell as CellM } from '../../../../model/cell';

type CellT = {
    cell: CellM;
    iteration: number;
}

export const Cell: FC<CellT> = ({cell})=>{

    return <td>
        {cell.value}
    </td>
}

export const CellH: FC<{text: string}> = ({text})=>{

    return <th>
        {text}
    </th>
}

