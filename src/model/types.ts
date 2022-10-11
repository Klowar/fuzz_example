import { Project } from './project';

/**
 * types definition for yyparser
 */

class ParseElement {
    index?: number;

    constructor(index?: number){
        this.index = index;
    }

    setIndex(index: number){
        this.index = index;
        return this;
    }
}

export class Literal extends ParseElement {
    value: string | number;

    constructor(value: string | number){
        super();
        this.value = value;
    }
}

export class Identifier extends ParseElement {
    name: string;

    constructor(name: string, index?: number){
        super(index);
        this.name = name;
    }

}

export class Expression {
    operator: string;

    constructor(operator: string){
        this.operator = operator;
    }
}

type ParamType = Identifier | Literal | Expression | Ammsc;
export class UnaryExpression extends Expression {
    param: ParamType;

    constructor(operator: string, param: ParamType){
        super(operator);
        this.param = param;
    }
}

export class BinaryExpression extends Expression {
    lParam: ParamType;
    rParam: ParamType;

    constructor(operator: string, lParam: ParamType, rParam: ParamType){
        super(operator);
        this.lParam = lParam;
        this.rParam = rParam;
    }
}

export class Ammsc {
    name: string;
    params: Identifier[];

    constructor(name: string, params: Identifier[]){
        this.name = name;
        this.params = params;
    }
}

export class Root {
    objects: any[];
    statement?: Literal | Ammsc | Expression;

    constructor(objects: any[]){
        this.objects = objects;
    }

    setStatement(expression: Ammsc | Expression){
        this.statement = expression;
        return this;
    }

    getValue(project: Project):any {
        return 10;
    }

}

export class Scope {
    //
    static readonly literal = Literal;
    static readonly identifier = Identifier;
    // Functions
    static readonly ammsc = Ammsc;
    // Expressions
    static readonly unary_expression = UnaryExpression;
    static readonly binary_expression = BinaryExpression;
}
