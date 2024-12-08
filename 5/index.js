const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const rulesAndLists = input.split(/\r\n\r\n/gm).map(c=> c.split(/\r\n/gm));
let rules = rulesAndLists[0].map(c=> c.split('|').map(p=> parseInt(p)));
let lists = rulesAndLists[1].map(c=> c.split(',').map(p=> parseInt(p)));

let ruleset = {};
rules.forEach(rule => {
    if (ruleset[rule[0]] == null){
        ruleset[rule[0]]=[rule[1]]
    }else{
        ruleset[rule[0]].push(rule[1])
    }
});

const customSort = (a, b)=>{
    if (!ruleset[a]){
        return 0;
    }

    if (ruleset[a].includes(b)){
        return -1;
    }
    else{
        return 1;
    }
}

let middleSumP1 = 0;
let middleSumP2 = 0;

lists.forEach(l=>{
    let listIsNotValid = false;
    for (let i=0; i<l.length; i++){
        let current = l[i];
        let previous = l.filter((_, index)=> index < i);
        let rules = ruleset[current];
        if (rules){
            let currentIsNotValid = previous.some(p=> rules.includes(p));
            if (currentIsNotValid){
                listIsNotValid = true;
                break;
            }
        }
            
    }

    if (!listIsNotValid){
        middleSumP1 += l[Math.floor(l.length/2)]
    }else{
        l.sort(customSort);
        middleSumP2 += l[Math.floor(l.length/2)]
    }
})

console.log('Part one', middleSumP1);
console.log('Part two', middleSumP2);
