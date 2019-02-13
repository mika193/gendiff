const typeMap = {
  added: '+ ',
  deleted: '- ',
  changeless: '  ',
};

const makeSpace = (count) => {
  const iter = (i, result) => {
    if (i === 0) {
      return result;
    }

    return ` ${iter(i - 1, result)}`;
  };

  return iter(count, '');
};

const stringify = (data, spaceCounter) => {
  const textGap = 6;
  const braceGap = 2;

  if (typeof data !== 'object') {
    return data;
  }

  const space = makeSpace(spaceCounter + textGap);
  const keys = Object.keys(data);
  const result = keys.map(key => `${key}: ${data[key]}`).join('\n');
  return `{\n${space}${result}\n${makeSpace(spaceCounter + braceGap)}}`;
};

const render = (ast) => {
  const textGap = 4;
  const braceGap = 2;
  const iter = (tree, spaceCounter) => {
    const space = makeSpace(spaceCounter);
    const result = tree.map((el) => {
      if (el.type !== 'changed') {
        const value = el.children.length > 0 ? `${iter(el.children, spaceCounter + textGap)}` : `${stringify(el.value, spaceCounter)}`;
        const element = `${space}${typeMap[el.type]}${el.name}`;
        return `${element}: ${value}`;
      }
      const deletedElement = `${space}${typeMap.deleted}${el.name}`;
      const addedElement = `${space}${typeMap.added}${el.name}`;
      const valueTo = `${stringify(el.valueTo, spaceCounter)}`;
      const valueFrom = `${stringify(el.valueFrom, spaceCounter)}`;
      return `${addedElement}: ${valueTo}\n${deletedElement}: ${valueFrom}`;
    }).join('\n');

    return `{\n${result}\n${makeSpace(spaceCounter - braceGap)}}`;
  };

  return iter(ast, 2);
};

export default render;
