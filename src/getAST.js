import _ from 'lodash';

const actions = [
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (key, obj1, obj2) => ({ valueFrom: '', valueTo: obj2[key] }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (key, obj1) => ({ valueFrom: obj1[key], valueTo: '' }),
  },
  {
    type: 'nested',
    check: (obj1, obj2, key) => typeof obj1[key] === 'object' && typeof obj2[key] === 'object',
    process: (key, obj1, obj2, fn) => ({ valueFrom: '', valueTo: '', children: fn(obj1[key], obj2[key]) }),
  },
  {
    type: 'same',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (key, obj1, obj2) => ({ valueFrom: obj1[key], valueTo: obj2[key] }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key],
    process: (key, obj1, obj2) => ({ valueFrom: obj1[key], valueTo: obj2[key] }),
  },
];

const getAction = (obj1, obj2, key) => actions.find(({ check }) => check(obj1, obj2, key));

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.map((key) => {
    const { type, process } = getAction(obj1, obj2, key);
    return { name: key, type, ...process(key, obj1, obj2, getAST) };
  });

  return result;
};

export default getAST;
