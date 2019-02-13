const statusMap = {
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
      if (!el.children) {
        if (el.status !== 'changed') {
          return `${space}${statusMap[el.status]}${el.name}: ${stringify(el.value, spaceCounter)}`;
        }
        return `${space}${statusMap.added}${el.name}: ${stringify(el.value.to, spaceCounter)}\n${space}${statusMap.deleted}${el.name}: ${stringify(el.value.from, spaceCounter)}`;
      }

      return `${space}${statusMap[el.status]}${el.name}: ${iter(el.children, spaceCounter + textGap)}`;
    }).join('\n');

    return `{\n${result}\n${makeSpace(spaceCounter - braceGap)}}`;
  };

  return iter(ast, 2);
};

export default render;
