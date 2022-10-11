import {FormEvent, FC, useMemo} from 'react';
import { Project } from '../../model/project';
import { Parser } from '../../parser';
import { Table } from './components/table';

export const RootPage:FC = ()=>{

    const _project = useMemo(()=>new Project(), []);
    const _parser = useMemo(()=> new Parser(), []);

    const onChange = (e: FormEvent<HTMLInputElement>)=>{
        const val = e.currentTarget.value;
        const elem = _project.getCell('A1');
        elem?.setFormula(_parser.parse(val));
    }

    return <div style={{width: '100vw', height: '100vh', overflow: 'scroll'}}>
        <input onChange={onChange}></input>
        <Table project={_project} rows={50} cells={26} />
    </div>;
}

