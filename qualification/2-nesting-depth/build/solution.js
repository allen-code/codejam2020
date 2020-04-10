'use strict';

const parseCase = (line, data) => {
  const {
    isProcessing,
    ...result
  } = data;
  result.N = line;
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
    N
  } = data;
  let result = N.split('');

  if (N.length == 1) {
    const num = parseInt(N);

    for (let i = 0; i < num; i++) {
      result.unshift('(');
    }

    for (let i = 0; i < num; i++) {
      result.push(')');
    }

    return result.join('');
  }

  const collection = clone(result);
  collection.map((item, index) => {
    if (!index) {
      for (let i = 0; i < parseInt(item); i++) {
        result.unshift('(');
      }

      if (collection[index] > collection[index + 1]) {
        const length = parseInt(collection[index]) - parseInt(collection[index + 1]);

        for (let i = 0; i < length; i++) {
          const gap = result.length - collection.length;
          result.splice(gap + index + 1, 0, ')');
        }
      } else if (collection[index] < collection[index + 1]) {
        const length = parseInt(collection[index]) - parseInt(collection[index + 1]);

        for (let i = 0; i < length; i++) {
          const gap = result.length - collection.length;
          result.splice(gap + index, 0, '(');
        }
      }
    } else if (index == collection.length - 1) {
      for (let i = 0; i < parseInt(item); i++) {
        result.push(')');
      }
    } else {
      if (collection[index] > collection[index + 1]) {
        const length = parseInt(collection[index]) - parseInt(collection[index + 1]);

        for (let i = 0; i < length; i++) {
          const gap = result.length - collection.length;
          result.splice(gap + index + 1, 0, ')');
        }
      } else if (collection[index] < collection[index + 1]) {
        const length = parseInt(collection[index + 1]) - parseInt(collection[index]);

        for (let i = 0; i < length; i++) {
          const gap = result.length - collection.length;
          result.splice(gap + index + 1, 0, '(');
        }
      }
    }
  });
  return result.join('');
};

function clone(item) {
  if (!item) {
    return item;
  } // null, undefined values check


  var types = [Number, String, Boolean],
      result; // normalizing primitives if someone did new String('aaa'), or new Number('444');

  types.forEach(function (type) {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result == "undefined") {
    if (Object.prototype.toString.call(item) === "[object Array]") {
      result = [];
      item.forEach(function (child, index, array) {
        result[index] = clone(child);
      });
    } else if (typeof item == "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == "function") {
        result = item.cloneNode(true);
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};

          for (var i in item) {
            result[i] = clone(item[i]);
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
}

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
