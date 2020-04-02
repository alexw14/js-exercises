// First Example

const promisify = (item, delay) =>
  new Promise(resolve => setTimeout(() => resolve(item), delay));

const a = () => promisify("a", 100);
const b = () => promisify("b", 5000);
const c = () => promisify("c", 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `parallel is done: ${output1} ${output2} ${output3}`;
}

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done ${output1} ${output2} ${output3}`;
}

sequence().then(console.log);
parallel().then(console.log);
race().then(console.log);

// Second Example
function changeColor(color, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay);
  });
}

async function changeInSequence() {
  await changeColor("blue", 1000);
  await changeColor("red", 1000);
  await changeColor("yellow", 1000);
  await changeColor("purple", 1000);
}

async function changeInParallel() {
  const c1 = changeColor("blue", 1000);
  const c2 = changeColor("red", 1000);
  const c3 = changeColor("yellow", 1000);
  const c4 = changeColor("purple", 1000);
  // await c1;
  // await c2;
  // await c3;
  // await c4;
  const results = await Promise.all([c1, c2, c3, c4]);
}

changeInSequence();
// changeInParallel();
