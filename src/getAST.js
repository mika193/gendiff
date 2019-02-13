import _ from 'lodash';

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.map((key) => {
    const name = key;
    const children = [];

    if (!_.has(obj1, key)) {
      const value = obj2[key];
      const type = 'added';
      return {
        name, value, type, children,
      };
    }

    if (!_.has(obj2, key)) {
      const value = obj1[key];
      const type = 'deleted';
      return {
        name, value, type, children,
      };
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const type = 'changeless';
      const comparedChildren = getAST(obj1[key], obj2[key]);
      return {
        name, value: '', type, children: comparedChildren,
      };
    }

    if (obj1[key] === obj2[key]) {
      const type = 'changeless';
      const value = obj1[key];
      return {
        name, value, type, children,
      };
    }

    const type = 'changed';
    const valueFrom = obj1[key];
    const valueTo = obj2[key];

    return {
      name, valueFrom, valueTo, type, children,
    };
  });

  return result;
};

export default getAST;
