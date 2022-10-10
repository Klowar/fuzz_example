import { Ammsc, Identifier, BinaryExpression, Literal } from './../../src/parser/types';
import assert from 'assert';
import {Parser} from '../../src/parser';

describe('Parser.parse', ()=>{

    let parser: Parser;
    beforeEach(()=>{
        parser = new Parser();
    });

    it('MIN function', ()=>{
        let root = parser.parse('MIN(A1, B2)');
        assert.deepEqual(
            root.statement,
            new Ammsc('MIN', [new Identifier('A1', 0), new Identifier('B2', 1)])
        );
    });

    it('MAX function', ()=>{
        let root = parser.parse('MAX(A1, B2)');
        assert.deepEqual(
            root.statement,
            new Ammsc('MAX', [new Identifier('A1', 0), new Identifier('B2', 1)])
        );
    });

    it('SUM function', ()=>{
        let root = parser.parse('SUM(A1, B2, C3, D4)');
        assert.deepEqual(
            root.statement,
            new Ammsc('SUM', [
                new Identifier('A1', 0),
                new Identifier('B2', 1),
                new Identifier('C3', 2),
                new Identifier('D4', 3),
            ])
        );
    });

    it('sum expression', ()=>{
        let root = parser.parse('1+2');
        assert.deepEqual(
            root.statement,
            new BinaryExpression('+', new Literal(1), new Literal(2))
        );
    });

});
