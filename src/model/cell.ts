import { EventEmitter } from 'eventemitter3';
import { Root } from './types';
import { Project } from './project';

export class Cell extends EventEmitter {

    private _row: number;
    private _column: string;

    private _project?: Project;

    private _formula?: Root;
    private _value: any;

    constructor(row: number, column: string){
        super();
        this._row = row;
        this._column = column;
    }

    getHash():string {
        return this._column+this._row;
    }

    setProject(project: Project):Cell {
        this._project = project;
        return this;
    }

    setFormula(formula: Root){
        this._formula = formula;
        this.emit('change', this);
        return this;
    }

    compile():void {
        if (!this._project||!this._formula)
            return;
        this._value = this._formula.getValue(this._project);
    }

    get value(){
        return this._value;
    }

}
