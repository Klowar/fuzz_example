name                [A-Z][0-9]+
int_num             [0-9]+|[0-9]+"."[0-9]* |"."[0-9]*
approx_num          [0-9]+[eE][+-]?[0-9]+|[0-9]+"."[0-9]*[eE][+-]?[0-9]+|"."[0-9]*[eE][+-]?[0-9]+
strings             ['\w']
white_space         [ \t\r\n]+
comparators         "=="|"<>"|"<"|">"|"<="|">="
math                "+"|"-"|"/"|"*"|"&"|"|"
special_symbols     ","|";"|"."|"("|")"|"="

%%

// Agg functions
"AVG"               return 'AMMSC';
"MIN"               return 'AMMSC';
"MAX"               return 'AMMSC';
"SUM"               return 'AMMSC';
"COUNT"             return 'AMMSC';
{white_space}       /* ignore white spaces */
{comment}           /* ignore comments */
{comparators}       return 'COMPARISON';
{special_symbols}   return yytext;
{math}              return 'MATH';
{name}+             return 'NAME';
{int_num}           return 'INTNUM';
{approx_num}        return 'APPROXNUM';
{strings}+          return 'STRING';