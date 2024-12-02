const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
let lists = input.split(/\n/).map(c=> c.split(/\s+/).map(p=> parseInt(p)).filter(p=> !isNaN(p)));
let safeLists=[];

const isValidList = (list) => {
    let diffs = [];
    for (let i = 0; i<list.length-1; i++){
        diffs.push(list[i] - list[i+1]);
    }
    let hasPos = diffs.some(c=> c > 0);
    let hasNeg = diffs.some(c=> c < 0);

    let extendsLimit = diffs
        .map(c=> Math.abs(c))
        .some(c=> c < 1 || c > 3);

    return (!(hasPos && hasNeg) && !extendsLimit);
}

for (const list of lists){
    if (isValidList(list)){
        safeLists.push(list);
    }
}
console.log("Part one",safeLists.length)

safeLists=[];
for (const list of lists){
    
    if (isValidList(list)){
        safeLists.push(list);
    }else{
        for (let i = 0; i<list.length; i++){
            if (isValidList(list.filter((_, index)=> index !== i))){
                safeLists.push(list);
                break;
            }
        }
    }
}
console.log("Part two",safeLists.length)