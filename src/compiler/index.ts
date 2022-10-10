import { Parser } from './sql';

export function getParser() {
    const p = new Parser();

    return p;
}