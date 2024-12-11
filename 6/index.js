const fs = require('fs');

let p1 = 0;
let p2 = 0;

const input = fs.readFileSync('input.txt', 'utf8');

const MAP = input.split('\n');
const yLimit = MAP.length;
const xLimit = MAP[0].length;

const DIRS={
    UP: 0,
    RIGHT:1,
    DOWN:2,
    LEFT:3
}

let startY; 
let startX;

for (let y = 0; y < yLimit; y++) {
    for (let x = 0; x < xLimit; x++) {
        if (MAP[y][x] === '^') {
            startY = y;
            startX = x;
        }
    }
}

for (let possibleY = 0; possibleY < yLimit; possibleY++) {
    for (let possibleX = 0; possibleX < xLimit; possibleX++) {
        let y = startY;
        let x = startX;
        let dir = DIRS.UP; 
        let history = new Set();
        let historyUniques = new Set();

        while (true) {
            const key = `${y},${x},${dir}`;
            if (history.has(key)) {
                p2++;
                break;
            }
            history.add(key);
            historyUniques.add(`${y},${x}`);

            let newX = x;
            let newY = y;
            switch (dir) {
                case DIRS.UP: // Up
                    newY -= 1;
                    break;
                case DIRS.RIGHT: // Right
                    newX += 1;
                    break;
                case DIRS.DOWN: // Down
                    newY += 1;
                    break;
                case DIRS.LEFT: // Left
                    newX -= 1;
                    break;
            }

            if (!(0 <= newY && newY < yLimit && 0 <= newX && newX < xLimit)) {
                if (MAP[possibleY][possibleX] === '#') {
                    p1 = historyUniques.size;
                }
                break;
            }

            if (MAP[newY][newX] === '#' || (newY === possibleY && newX === possibleX)) {
                dir = (dir + 1) % 4;
            } else {
                y = newY;
                x = newX;
            }
        }
    }
}

console.log(p1);
console.log(p2);
