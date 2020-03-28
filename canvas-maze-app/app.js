const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const width = window.innerWidth;
const height = window.innerHeight;
const cellsHorizontal = 10;
const cellsVertical = 10;
const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const engine = Engine.create();
const world = engine.world;
engine.world.gravity.y = 0;
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
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true })
];
World.add(world, walls);

// Maze Generation
const grid = Array(cellsVertical).fill(null).map(() => {
  return Array(cellsHorizontal).fill(false);
});

const verticals = Array(cellsVertical).fill(null).map(() => {
  return Array(cellsHorizontal - 1).fill(false);
});

const horizontals = Array(cellsVertical - 1).fill(null).map(() => {
  return Array(cellsHorizontal).fill(false);
});

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

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
    if (nextRow < 0 || nextRow >= cellsVertical || nextCol < 0 || nextCol >= cellsHorizontal) {
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
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      5,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: 'purple'
        }
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
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      5,
      unitLengthY,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: 'purple'
        }
      }
    )
    World.add(world, wall);
  })
});

// Creating Goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * .7,
  unitLengthY * .7,
  {
    label: 'goal',
    isStatic: true,
    render: {
      fillStyle: 'gold'
    }
  }
);
World.add(world, goal);

// Creating moving piece
const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(
  unitLengthX / 2,
  unitLengthY / 2,
  ballRadius,
  {
    label: 'ball',
    render: {
      fillStyle: 'gold'
    }
  }
);
World.add(world, ball);

// Handling key presses
document.addEventListener('keydown', (event) => {
  const { x, y } = ball.velocity;
  // Up (W Key)
  if (event.keyCode === 87) {
    Body.setVelocity(ball, { x, y: y - 5 });
  }
  // Right (D Key)
  if (event.keyCode === 68) {
    Body.setVelocity(ball, { x: x + 5, y });
  }
  // Down (S Key)
  if (event.keyCode === 83) {
    Body.setVelocity(ball, { x, y: y + 5 });
  }
  // Left (A Key)
  if (event.keyCode === 65) {
    Body.setVelocity(ball, { x: x - 5, y });
  }
});

// Win Condition
Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    const labels = ['ball', 'goal'];
    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyB.label)) {
      document.querySelector('.winner').classList.remove('hidden');
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === 'wall') {
          Body.setStatic(body, false);
        }
      })
    }
  });
});
