const { Engine, Render, Runner, World, Bodies } = Matter;

const width = 600;
const height = 600;
const cells = 10;
const unitLength = width / cells;

const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);


// Outer Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);

// Maze Generation
const grid = Array(cells).fill(null).map(() => {
  return Array(cells).fill(false);
});

const verticals = Array(cells).fill(null).map(() => {
  return Array(cells - 1).fill(false);
});

const horizontals = Array(cells - 1).fill(null).map(() => {
  return Array(cells).fill(false);
});

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const shuffle = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const stepThroughCell = (row, col) => {
  // If visited cell at [row, col], then return
  if (grid[row][col]) {
    return;
  }
  // Mark this cell as visited
  grid[row][col] = true;
  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, col, 'up'],
    [row, col + 1, 'right'],
    [row + 1, col, 'down'],
    [row, col - 1, 'left']
  ]);
  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextCol, direction] = neighbor;
    // See if neighbor is out of bounds
    if (nextRow < 0 || nextRow >= cells || nextCol < 0 || nextCol >= cells) {
      continue; // don't break out of the for loop
    }
    // If visited neighbor, continue to next neighbor
    if (grid[nextRow][nextCol]) {
      continue;
    }
    // Remove a wall from either horizontal or vertical
    if (direction === 'left') {
      verticals[row][col - 1] = true;
    } else if (direction === 'right') {
      verticals[row][col] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][col] = true;
    } else if (direction === 'down') {
      horizontals[row][col] = true;
    }
    // call itself with next row and next column
    stepThroughCell(nextRow, nextCol);
  }
}

stepThroughCell(startRow, startColumn);

// Creating Walls
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open === true) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      10,
      {
        isStatic: true
      }
    )
    World.add(world, wall);
  })
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open === true) {
      return;
    }
    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      10,
      unitLength,
      {
        isStatic: true
      }
    )
    World.add(world, wall);
  })
});
