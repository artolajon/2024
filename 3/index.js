const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const calculate = (input)=>{
    const regex = /mul\([-\d]{1,3},[-\d]{1,3}\)/g;
    const equations = input.match(regex)
    let sum = 0;
    for (let equation of equations){
        let vars = equation.replace('mul(','').replace(')', '').split(',');
        sum += vars[0] * vars[1]
    }   

    return sum;
}

console.log('Part one', calculate(input))

const oneLineInput = input.replace(/(\r\n|\n|\r)/gm,'')
const wantedInput = oneLineInput.replace(/don't\(\).*?do\(\)/g,'')
console.log('Part two', calculate(wantedInput))