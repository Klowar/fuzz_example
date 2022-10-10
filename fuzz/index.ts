import {Parser} from '../src/parser';

export function fuzz(data: Buffer){
    let p = new Parser();
    try {
        p.parse(data.toString());
        return 1; // Parsed case
    } catch(e) {
        return 0; // Skip case
    }
}
