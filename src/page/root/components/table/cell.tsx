import {FC} from 'react';

type CellT = {

}

export const Cell: FC<CellT> = ()=>{

    return <td>
        {Math.random()}
    </td>
}

export const CellH: FC<{text: string}> = ({text})=>{

    return <th>
        {text}
    </th>
}

