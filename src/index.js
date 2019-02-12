import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const findUniqKeys = (keys1, keys2) => {
  const filteredKeys2 = keys2.filter(el => !keys1.includes(el));
  return keys1.concat(filteredKeys2);
};

const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = findUniqKeys(keys1, keys2);

  return uniqKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: 'added' };
    }

    if (!_.has(obj2, key)) {
      return { ...acc, [key]: 'deleted' };
    }

    if (obj1[key] === obj2[key]) {
      return { ...acc, [key]: 'changeless' };
    }

    return { ...acc, [key]: 'changed' };
  }, {});
};

const getObject = (filePath) => {
  const file = fs.readFileSync(filePath);
  const fileFormat = path.extname(filePath).split('.')[1];
  return parse(file, fileFormat);
};

const genDiff = (path1, path2) => {
  const obj1 = getObject(path1);
  const obj2 = getObject(path2);

  const statusMap = {
    added: key => ` + ${key}: ${obj2[key]}`,
    deleted: key => ` - ${key}: ${obj1[key]}`,
    changeless: key => `  ${key}: ${obj1[key]}`,
    changed: key => ` + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}`,
  };

  const compareResult = compareObjects(obj1, obj2);

  const resultKeys = Object.keys(compareResult);

  const result = resultKeys.reduce((acc, key) => `${acc} ${statusMap[compareResult[key]](key)}\n`, '');

  return `{\n ${result}}`;
};

export default genDiff;
