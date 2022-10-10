import {FC} from 'react';
import { Table } from './components/table';

export const RootPage:FC = ()=>{

    return <div style={{width: '100vw', height: '100vh', overflow: 'scroll'}}>
        <input></input>
        <Table rows={50} cells={26} />
    </div>;
}

