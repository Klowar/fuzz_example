import {FC, PropsWithChildren} from 'react';

export const Container: FC<PropsWithChildren> = ({children})=>{

    return <div style={{margin: '0 5%'}}>
        {children}
    </div>;
}
