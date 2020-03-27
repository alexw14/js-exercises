const { Engine, Render, Runner, World, Bodies } = Matter;

const width = 600;
const height = 600;
const cells = 3;

const engine = Engine.create();
const world = engine.world;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: true
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

console.log(grid);
console.log(verticals);
console.log(horizontals);