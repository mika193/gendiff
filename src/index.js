import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const compareObjects = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }

    if (!_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (obj1[key] === obj2[key]) {
      return `   ${key}: ${obj1[key]}`;
    }

    return `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`;
  });
};

const getObject = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const fileFormat = path.extname(filePath).split('.')[1];
  return parse(file, fileFormat);
};

const genDiff = (path1, path2) => {
  const obj1 = getObject(path1);
  const obj2 = getObject(path2);
  const result = compareObjects(obj1, obj2).join('\n');

  return `{\n ${result}\n}`;
};

export default genDiff;
