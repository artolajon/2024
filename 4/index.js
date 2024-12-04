const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const table = input.split(/\r\n/gm).map(c=> c.split(""));
const yLimit = table.length;
const xLimit = table[0].length;

const checkWays = (x0, y0)=> {
    let count = 0;
    const possibleWays = [
        [[0,0], [0,1], [0,2], [0,3]],
        [[0,0], [1,1], [2,2], [3,3]],
        [[0,0], [1,0], [2,0], [3,0]],
        [[0,0], [1,-1], [2,-2], [3,-3]],
        [[0,0], [0,-1], [0,-2], [0,-3]],
        [[0,0], [-1,-1], [-2,-2], [-3,-3]],
        [[0,0], [-1,0], [-2,0], [-3,0]],
        [[0,0], [-1,1], [-2,2], [-3,3]],
    ];

    for(let way of possibleWays){
        let cellExists = (0 <= y0+way[3][1]) &&(yLimit > y0+way[3][1]) && (0 <= x0+way[3][0]) && (xLimit > x0+way[3][0]);
        
        if (cellExists){
            if (table[y0+way[1][1]][x0+way[1][0]] == "M" 
                && table[y0+way[2][1]][x0+way[2][0]] == "A" 
                && table[y0+way[3][1]][x0+way[3][0]] == "S"){
                    count += 1;
                }
        }
    }

    return count;
}
const isX = (x0, y0)=> {
    const way = [[1,1], [1,-1], [-1,-1], [-1,1]];
    const possibles = ["SSMM","SMMS","MMSS","MSSM"];

    const cross = way.map(cell=> table[y0+cell[1]]? table[y0+cell[1]][x0+cell[0]] : null).join('');

    return (possibles.includes(cross))
}


let p1Counter = 0;
let p2Counter = 0;
for(let y = 0; y<table.length; y++){
    for(let x = 0; x<table[y].length; x++){
        if (table[y][x] == "X"){
            p1Counter += checkWays(x, y);
        }else if(table[y][x] == "A" && isX(x,y)){
            p2Counter +=1
        }
    }
}

console.log('Part one', p1Counter);
console.log('Part two', p2Counter);