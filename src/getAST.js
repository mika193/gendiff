import _ from 'lodash';

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.map((key) => {
    const name = key;

    if (!_.has(obj1, key)) {
      const valueFrom = '';
      const valueTo = obj2[key];
      const type = 'added';
      return {
        name, valueFrom, valueTo, type,
      };
    }

    if (!_.has(obj2, key)) {
      const valueTo = '';
      const valueFrom = obj1[key];
      const type = 'deleted';
      return {
        name, valueFrom, valueTo, type,
      };
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const type = 'nested';
      const children = getAST(obj1[key], obj2[key]);
      const valueFrom = '';
      const valueTo = '';
      return {
        name, valueFrom, valueTo, type, children,
      };
    }

    if (obj1[key] === obj2[key]) {
      const type = 'same';
      const valueTo = obj1[key];
      const valueFrom = obj2[key];
      return {
        name, valueFrom, valueTo, type,
      };
    }

    const type = 'changed';
    const valueFrom = obj1[key];
    const valueTo = obj2[key];

    return {
      name, valueFrom, valueTo, type,
    };
  });

  return result;
};

export default getAST;
