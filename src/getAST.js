import _ from 'lodash';

const getAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));

  const result = keys.map((key) => {
    const name = key;

    if (!_.has(obj1, key)) {
      const value = obj2[key];
      const status = 'added';
      return { name, value, status };
    }

    if (!_.has(obj2, key)) {
      const value = obj1[key];
      const status = 'deleted';
      return { name, value, status };
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const status = 'changeless';
      const children = getAST(obj1[key], obj2[key]);
      return {
        name, value: '', status, children,
      };
    }

    if (obj1[key] === obj2[key]) {
      const status = 'changeless';
      const value = obj1[key];
      return { name, value, status };
    }

    const status = 'changed';
    const value = {
      from: obj1[key],
      to: obj2[key],
    };

    return { name, value, status };
  });

  return result;
};

export default getAST;
