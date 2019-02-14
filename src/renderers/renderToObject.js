const stringify = (data, depth, gap) => {
  const space = ' '.repeat(gap + depth * gap);

  if (typeof data !== 'object') {
    return data;
  }

  const keys = Object.keys(data);
  const result = keys.map(key => `${key}: ${data[key]}`).join('\n');
  return `{\n${space}${result}\n${' '.repeat(depth * gap)}}`;
};

const getString = (space, sign, name, valueParams) => `${space}${sign} ${name}: ${stringify(...valueParams)}`;

const renderToObject = (tree, depth = 0) => {
  const braceGap = 2;
  const textGap = 4;
  const spaceLength = braceGap + depth * textGap;
  const space = ' '.repeat(spaceLength);
  const typeMap = {
    added: ({ name, valueTo }) => getString(space, '+', name, [valueTo, depth + 1, textGap]),

    deleted: ({ name, valueFrom }) => getString(space, '-', name, [valueFrom, depth + 1, textGap]),

    same: ({ name, valueTo }) => getString(space, ' ', name, [valueTo, depth + 1, textGap]),

    nested: ({ children, name }) => `${space}  ${name}: ${renderToObject(children, depth + 1, textGap)}`,

    changed: el => `${typeMap.added(el)}\n${typeMap.deleted(el)}`,
  };

  const result = tree.map(el => typeMap[el.type](el)).join('\n');

  return `{\n${result}\n${' '.repeat(spaceLength - braceGap)}}`;
};

export default renderToObject;
