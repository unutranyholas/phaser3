import generator from "generate-maze";

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const blocks = [16, 41, 66]
const spaces = [67, 68, 93];

const getRandomBlock = () => blocks[getRandomInt(blocks.length)];
const getRandomSpace = () => spaces[getRandomInt(spaces.length)];

const generateEmptyLevel = (width, height) => {
  const result = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(0);
    }
    result.push(row);
  }
  return result;
}

export const generateLevel = (width, height, cellSize) => {
  let level = generateEmptyLevel(width * cellSize, height * cellSize);
  const maze = generator(width, height).flatMap((array) => array);
  maze.forEach(({x, y, left, top, right, bottom}) => {
    const cellX = cellSize * x;
    const cellY = cellSize * y;
    level[cellY][cellX] = getRandomBlock();
    level[cellY][cellX + 1] = top ? getRandomBlock() : getRandomSpace();
    level[cellY][cellX + 2] = getRandomBlock();

    level[cellY + 1][cellX] = left ? getRandomBlock() : getRandomSpace();
    level[cellY + 1][cellX + 1] = getRandomSpace();
    level[cellY + 1][cellX + 2] = right ? getRandomBlock() : getRandomSpace();

    level[cellY + 2][cellX] = getRandomBlock();
    level[cellY + 2][cellX + 1] = bottom ? getRandomBlock() : getRandomSpace();
    level[cellY + 2][cellX + 2] = getRandomBlock();
  });
  return level;
}