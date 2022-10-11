import { Project } from './project';
import _ from 'lodash';

/**
 * types definition for yyparser
 */

abstract class ParseElement {
    index?: number;

    constructor(index?: number){
        this.index = index;
    }

    setIndex(index: number){
        this.index = index;
        return this;
    }

    getValue(project: Project): any {
        return undefined;
    }

}

export class Literal extends ParseElement {
    value: string | number;

    constructor(value: string | number){
        super();
        this.value = value;
    }

    getValue(project: Project): string | number {
        return this.value;
    }
}

export class Identifier extends ParseElement {
    name: string;

    constructor(name: string, index?: number){
        super(index);
        this.name = name;
    }

    getValue(project: Project) {
        const elem = project.getCell(this.name);
        return elem?.value;
    }

}

export abstract class Expression extends ParseElement {
    operator: string;

    constructor(operator: string){
        super();
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

    getValue(project: Project) {
        switch(this.operator){
            case '-':
                return -this.param.getValue(project);
            case '!':
                return !this.param.getValue(project);
            default:
                return undefined;
        }
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

    getValue(project: Project) {
        switch(this.operator){
            case '+':
                return this.lParam.getValue(project)+this.rParam.getValue(project);
            case '-':
                return this.lParam.getValue(project)-this.rParam.getValue(project);
            case '*':
                return this.lParam.getValue(project)*this.rParam.getValue(project);
            case '/':
                return this.lParam.getValue(project)/this.rParam.getValue(project);
            case '%':
                return this.lParam.getValue(project)%this.rParam.getValue(project);
        }    
    }
}

export class Ammsc extends ParseElement {
    name: string;
    params: Identifier[];

    static functionMap = new Map<string, Function> ([
        ['MIN', _.min],
        ['MAX', _.max],
        ['COUNT', _.countBy],
        ['SUM', _.sum]
    ]);

    constructor(name: string, params: Identifier[]){
        super();
        this.name = name;
        this.params = params;
    }

    getValue(project: Project) {
        const fn = Ammsc.functionMap.get(this.name);
        return fn ? fn(this.params.map(p=>p.getValue(project))) : undefined;
    }

}

export class Root extends ParseElement {
    objects: any[];
    statement?: Literal | Ammsc | Expression;

    constructor(objects: any[]){
        super(0);
        this.objects = objects;
    }

    setStatement(expression: Ammsc | Expression){
        this.statement = expression;
        return this;
    }

    getValue(project: Project):any {
        return this.statement?.getValue(project);
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
