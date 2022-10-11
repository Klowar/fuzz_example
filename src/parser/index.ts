import { getParser as getCompiledParser } from '../compiler';
import { Root, Scope } from '../model/types';
export * from '../model/types';

export class Parser {

    readonly parser: {
        parse: Function,
        yy: {[key: string]: any}
    };

    constructor(){
        this.parser = getCompiledParser();
        this.parser.yy.scope = Scope;
        this.parser.yy.ast = new Root([]);
    }

    parse(data: string): Root {
        this.parser.parse(data);
        return this.parser.yy.ast;
    }

}

