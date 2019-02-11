import _ from 'lodash';
import fs from 'fs';

const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const newKeys = keys2.filter(el => !keys1.includes(el));

  const commonKeys = keys1.concat(newKeys);

  return commonKeys.reduce((acc, key) => {
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

const genDiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1));
  const obj2 = JSON.parse(fs.readFileSync(path2));

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
