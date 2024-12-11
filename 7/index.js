const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const parseLine = (line)=>{
    let fields = line.split(":");
    let result = parseInt(fields[0]);
    let items = fields[1].trim().split(" ").map(x=> parseInt(x))

    return {result: result, items: items};
}


const isValid = (result, items, part)=>{
    let nextItems = JSON.parse(JSON.stringify(items))
    let results = []
    const iteraction = (actual, items) =>{
        let nextItems = JSON.parse(JSON.stringify(items))
        if(nextItems.length == 0){
            results.push(actual);
        }
        else{
            let item = nextItems.shift();
            iteraction(actual+item, nextItems);
            iteraction(actual*item, nextItems);
            if (part == 2) iteraction(parseInt(actual.toString()+item.toString()), nextItems);
        }
    }

    let item = nextItems.shift();
    iteraction(item, nextItems);

    return results.some(c=> c==result);
}




const equations = input.split(/\r\n/gm)
    .map(c=> parseLine(c));

let p1=equations.filter(c=> isValid(c.result, c.items, 1))
    .map(c=> c.result)
    .reduce((prev, current)=> prev+current);

let p2=equations.filter(c=> isValid(c.result, c.items, 2))
    .map(c=> c.result)
    .reduce((prev, current)=> prev+current);

console.log('Part one', p1);
console.log('Part two', p2);