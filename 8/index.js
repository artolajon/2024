const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const getMap = (input) =>{
    const lines = input.split(/\n/g);
    const map = lines.map(l=>l.trim().split(""));
    return map;
}

const getAntenas = (map) =>{
    let antenas = [];
    map.forEach((line, indexY) => {
        line.forEach((cell, indexX) => {
            if (cell != ".")
                antenas.push({x: indexX, y: indexY, type: cell})        
        });       
    });
    return antenas;
}

const getAntinodes  = (antenas, limitX, limitY) =>{
    let antinodes = [];
    let echos = [];
    antenas.forEach((antena0) => {
        antenas.forEach((antena1) => {
            if (!(antena0.x == antena1.x && antena0.y == antena1.y)){
                    
                const xDiff = antena0.x - antena1.x;
                const yDiff = antena0.y - antena1.y;

                let newX = antena0.x + xDiff;
                let newY = antena0.y + yDiff;

                // add itself
                echos.push({x: antena1.x, y: antena1.y, type: "#", key: `${antena1.x};${antena1.y}`});

                if (newX >= 0 && newX < limitX && newY >= 0 && newY < limitY)
                {
                    const antinode = {x: newX, y: newY, type: "#", key: `${newX};${newY}`};
                    antinodes.push(antinode);
                }
                while (newX >= 0 && newX < limitX && newY >= 0 && newY < limitY ){
                    const echo = {x: newX, y: newY, type: "#", key: `${newX};${newY}`};
                    echos.push(echo);

                    newX = newX + xDiff;
                    newY = newY + yDiff;
                }
            }
        });    
    });
    return {antinodes, echos};
}

const map = getMap(input);
const antenas = getAntenas(map);
const uniqueTypes = new Set(antenas.map(a=> a.type))
let antinodes = [];
let echos =[]
uniqueTypes.forEach(type=>{
    let result = getAntinodes(antenas.filter(c=> c.type == type), map[0].length, map.length)
    antinodes = antinodes.concat(result.antinodes);
    echos = echos.concat(result.echos);
})

const uniqueAntinodesP1 = new Set(antinodes.map(c=> c.key))
const uniqueAntinodesP2 = new Set(echos.map(c=> c.key))

console.log('Part one', uniqueAntinodesP1.size);
console.log('Part two', uniqueAntinodesP2.size);