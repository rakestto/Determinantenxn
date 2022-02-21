function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function initializeMatrix(n) {
  return Array.from(
    {
      length: n,
    },
    () => new Array(n).fill(0)
  );
}

function createMatrix(n) {
  result = initializeMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = getRandomArbitrary(-3, 12);
    }
  }
  return result;
}

let Matrix = createMatrix(100);
// let Matrix = [
//   [3, 2, 3, 2, 4],
//   [3, 4, 3, 2, 2],
//   [1, 3, 5, 5, 4],
//   [0, 4, 3, 4, 2],
//   [5, 3, 2, 2, 3],
// ];

// let Matrix = [
//     [0, 2, 5, 9],
//     [10, 7, 8, 6],
//     [5, 4, 3, 2],
//     [1, 0, 9, 2],
// ]; // = -442

//MATIX WITH 0 + -30
// let Matrix = [
//   [3, 3, 5, 3, 4],
//   [2, 3, 5, 4, 4],
//   [3, 4, 5, 2, 2],
//   [3, 3, 5, 3, 2],
//   [5, 4, 5, 3, 4],
// ];

console.log(Matrix);

const reorderMatrix = (column) => {
  Matrix = Matrix.sort((a, b) => {
    if (a[column] === 1) {
      return -1;
    } else if (a[column] > 0) {
      return a[column] - b[column];
    } else if (a[column] === 0) {
      return 1;
    } else {
      return b[column] - a[column];
    }
  });
};
const reorderRowsWithZeros = (column) => {
  Matrix = Matrix.sort((a, b) => {
    if (b[column] === 0) {
      return -1;
    }
  });
};

reorderMatrix(0);

console.log(Matrix);

const calculateZeros = (targetNumber, currentTopNumber, row, column) => {
  if (targetNumber === 0) return;
  if (currentTopNumber === 0) {
    reorderRowsWithZeros(column);
    targetNumber = Matrix[row][column];
    currentTopNumber = Matrix[column][column];
    if (targetNumber === 0) return;
  }
  let multiplier = (targetNumber * -1) / currentTopNumber;
  for (let i = column; i < Matrix.length; i++) {
    const sum = Matrix[column][i] * multiplier;
    Matrix[row][i] = Matrix[row][i] + sum;
  }
};

for (let i = 0; i < Matrix.length - 1; i++) {
  for (let j = i + 1; j < Matrix.length; j++) {
    calculateZeros(Matrix[j][i], Matrix[i][i], j, i);
  }
}

let det = 1;

console.log(Matrix);

for (let i = 0; i < Matrix.length; i++) {
  det *= Matrix[i][i];
}

console.log(Matrix);
console.log(det.toFixed(0));
