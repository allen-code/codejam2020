'use strict';

const parseCase = (line, data) => {
  const {
    isProcessing,
    ...result
  } = data;

  if (result.N === undefined) {
    result.N = parseInt(line);
    result.isProcessing = true;
    return result;
  }

  result.N = result.N - 1;

  if (result.N !== 0) {
    result.isProcessing = true;
  }

  if (!result.M) {
    result.M = [line.split(' ')];
  } else {
    result.M.push(line.split(' '));
  }

  return result;
};

const parseProblem = (line, problem) => {
  if (!problem.T || problem.T === 0) {
    const result = { ...problem,
      T: parseInt(line),
      isProcessing: true
    };
    return result;
  }

  const cases = [...problem.cases];

  if (cases.length === 0 || !cases[cases.length - 1].isProcessing) {
    cases.push({
      isProcessing: true
    });
  }

  const currentCase = cases[cases.length - 1];
  cases[cases.length - 1] = parseCase(line, currentCase);
  const isProcessing = cases.length < problem.T || cases[cases.length - 1].isProcessing;
  const result = { ...problem,
    cases,
    isProcessing
  };
  return result;
};

const solve = data => {
  const {
    M
  } = data;

  const arrSum = arr => arr.reduce((sum, curr, index) => sum + parseInt(curr[index]), 0);

  const hasDuplicates = arr => new Set(arr).size !== arr.length;

  const rotate = arr => arr[0].map((col, i) => arr.map(row => row[i]));

  const findDuplicateNumber = arr => arr.reduce((sum, curr) => sum + (hasDuplicates(curr) ? 1 : 0), 0);

  const result = `${arrSum(M)} ${findDuplicateNumber(M)} ${findDuplicateNumber(rotate(M))}`;
  return result;
};

const solveCases = cases => {
  for (let index = 0; index < cases.length; index++) {
    const result = solve(cases[index]);
    console.log(`Case #${index + 1}: ${result}`);
  }
};

const main = () => {
  const readline = require('readline');

  let problem = {
    T: 0,
    cases: [],
    isProcessing: true
  };
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', line => {
    problem = parseProblem(line, problem);

    if (!problem.isProcessing) {
      rl.close();
    }
  }).on('close', () => {
    solveCases(problem.cases);
    process.exit(0);
  });
};

if (!module.parent) {
  main();
}
