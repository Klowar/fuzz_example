%left COMPARISON 
%left '+' '-'
%left '*' '/'
%left '&' '|'
%nonassoc UMINUS

%%

formula: 
        argument {
            {
                yy.ast.setStatement($1);
            }
        }
    |   statement {
            {
                yy.ast.setStatement($1);
            }
        }
    ;

statement:
        expression
    |   function
    ;

expression:
        unary_expression
    |   binary_expression
    ;

binary_expression:
        argument MATH argument {
            {
                $$ = new yy.scope.binary_expression($2, $1, $3);
            }
        }
    |   argument MATH function {
            {
                {
                    $$ = new yy.scope.binary_expression($2, $1, $3);
                }
            }
        }
    |   argument MATH expression {
            {
                $$ = new yy.scope.binary_expression($2, $1, $3);
            }
        }
    ;

unary_expression:
        '!' argument {
            {
                $$ = new yy.scope.unary_expression($1, $2);
            }
        }
    |   '-' argument {
            {
                $$ = new yy.scope.unary_expression($1, $2);
            }
        }
    |   '!' function {
            {
                $$ = new yy.scope.unary_expression($1, $2);
            }
        }
    |   '-' function {
            {
                $$ = new yy.scope.unary_expression($1, $2);
            }
        }
    |   '!' unary_expression {
            {
                $$ = new yy.scope.unary_expression($1, $2);
            }
        }
    |   '-' unary_expression {
            {
                $$ = new yy.scope.unary_expression($1, $2);
            }
        }
    ;

function:
        AMMSC '(' multi_identifier ')' {
            {
                $$ = new yy.scope.ammsc($1, $3); 
            }
        }
    ;

argument:
        identifier
    |   literal
    ;

identifier:
        NAME {
            {
                $$ = new yy.scope.identifier($1);
            }
        }
    ;

multi_identifier:
        multi_identifier ',' identifier {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $3.setIndex($$.length);
                $$.push($3);
            }
        }
    |   identifier {
            {
                $$ = [$1];
                $1.setIndex(0);
            }
        }
    ;

multi_literal:
        multi_literal ',' literal {
            {
                $$ = Array.isArray($1) ? $1 : [$1];
                $$.push($3);
            }
        }
    |   literal {
            {
                $$ = [$1];
            }
        }
    ;

literal:
        STRING {
            {
                $$ = new yy.scope.literal($1);
            }
        }
    |   INTNUM {
            {
                $$ = new yy.scope.literal(+$1);
            }
        }
    ;

// ../../node_modules/.bin/jison compile/sql2.jison compile/sql.jisonlex 
%%