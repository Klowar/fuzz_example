import {Cell} from './cell';

export class Project {

    private cells: Map<string, Cell> = new Map([]);

    constructor(){
        this.onCellChange = this.onCellChange.bind(this);
    }

    private onAdd(cell: Cell){
        cell.on('change', this.onCellChange);
        return this;
    }

    private onRemove(cell: Cell){
        cell.off('change', this.onCellChange);
        return this;
    }

    private onCellChange(cell: Cell){
        cell.compile();
    }

    getCell(hash: string){
        return this.cells.get(hash);
    }

    addCell(cell: Cell){
        this.cells.set(cell.getHash(), cell);
        this.onAdd(cell)
        return cell.setProject(this);
    }

    compile(){
        for(let c of this.cells.values())
            c.compile();
    }

}


