const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

let lists = input.split(/\n/).map(c=> c.split(/\s+/).map(p=> parseInt(p)));
let left_list = lists.map(c=> c[0]);
let right_list = lists.map(c=> c[1]);

left_list.sort()
right_list.sort()
let resultSum = 0;
for(let i = 0; i < left_list.length; i++){
    if (!isNaN(left_list[i]) && !isNaN(right_list[i]))
        resultSum += Math.abs(left_list[i] - right_list[i])
}

console.log('Part 1', resultSum)
resultSum = 0;
for(let i = 0; i < left_list.length; i++){
    if (!isNaN(left_list[i]))
        resultSum += left_list[i] * right_list.filter(c=> c == left_list[i]).length;
}

console.log('Part 2', resultSum)