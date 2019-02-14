import _ from 'lodash';

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.map((key) => {
    const name = key;
    const children = [];
    let valueFrom = '';
    let valueTo = '';

    if (!_.has(obj1, key)) {
      valueTo = obj2[key];
      const type = 'added';
      return {
        name, valueFrom, valueTo, type, children,
      };
    }

    if (!_.has(obj2, key)) {
      valueFrom = obj1[key];
      const type = 'deleted';
      return {
        name, valueFrom, valueTo, type, children,
      };
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const type = 'changeless';
      const comparedChildren = getAST(obj1[key], obj2[key]);
      return {
        name, valueFrom, valueTo, type, children: comparedChildren,
      };
    }

    if (obj1[key] === obj2[key]) {
      const type = 'changeless';
      valueTo = obj1[key];
      valueFrom = obj2[key];
      return {
        name, valueFrom, valueTo, type, children,
      };
    }

    const type = 'changed';
    valueFrom = obj1[key];
    valueTo = obj2[key];

    return {
      name, valueFrom, valueTo, type, children,
    };
  });

  return result;
};

export default getAST;
