import {Parser} from '../src/parser';

export function fuzz(data: Buffer){
    let p = new Parser();
    try {
        p.parse(data.toString());
        return 0;
    } catch(e) {
        return 1;
    }
}
