const width = 20;
const height = 12;

export function generateGame() {
  const snake = {
    head: {
      x: width / 2,
      y: height / 2,
    },
    tail: [
      {
        x: width / 2 - 1,
        y: height / 2,
      },
    ],
    dir: "right",
  };
  return {
    snake: snake,
    food: generateFood(snake),
  };
}

export function generateFood(snake) {
  let food = { ...snake.head };
  while (
    isEqual(food, snake.head) ||
    snake.tail.some((cell) => isEqual(food, cell))
  ) {
    food = {
      x: random(width),
      y: random(height),
    };
  }
  return food;
}

export function isEqual(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function random(max) {
  return Math.floor(Math.random() * max);
}

export function tick(oldGame) {
  const oldSnake = oldGame.snake;
  const oldFood = oldGame.food;

  const newHead = generateNewHead(oldSnake);
  const newTail = generateNewTail(oldSnake, oldFood, newHead);
  const newSnake = {
    ...oldSnake,
    head: newHead,
    tail: newTail,
  };

  let newFood = oldFood;
  // Wait a minute... if newHead has eaten the food, we should generate new food!
  // In that case, change newFood, use generateFood function.
  if (isEqual(newHead, oldFood)) {
    newFood = generateFood(newSnake);
  }

  return {
    snake: newSnake,
    food: newFood,
  };
}

function generateNewHead(oldSnake) {
  let newHead;
  switch (oldSnake.dir) {
    case "right":
      newHead = { x: oldSnake.head.x + 1, y: oldSnake.head.y };
      break;
    case "down":
      // newHead = ???
      newHead = { x: oldSnake.head.x, y: oldSnake.head.y + 1 };
      break;
    case "left":
      // newHead = ???
      newHead = { x: oldSnake.head.x - 1, y: oldSnake.head.y };
      break;
    case "up":
      // newHead = ???
      newHead = { x: oldSnake.head.x, y: oldSnake.head.y - 1 };
      break;
  }
  return newHead;
}

function generateNewTail(oldSnake, oldFood, newHead) {
  // Create a variable newTail (an array). Its first cell should be the old snake's head
  // and the rest of the cells should be the old snake's tail. Use concat() function
  // to add (append) a whole array to another array. Or you can use the [...myArray] syntax somehow... :)
  let newTail = [oldSnake.head, ...oldSnake.tail];

  // Now the snake's tail has become longer! We should keep it like that if the snake has eaten,
  // otherwise we need to shorten it (remove the last element). Use the pop() function.
  if (!isEqual(newHead, oldFood)) {
    newTail.pop();
  }

  // Don't forget to return newTail!
  return newTail;
}
