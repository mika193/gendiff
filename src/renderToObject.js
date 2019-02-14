const stringify = (data, spaceCounter) => {
  const textGap = 6;
  const braceGap = 2;

  if (typeof data !== 'object') {
    return data;
  }

  const space = ' '.repeat(spaceCounter + textGap);
  const keys = Object.keys(data);
  const result = keys.map(key => `${key}: ${data[key]}`).join('\n');
  return `{\n${space}${result}\n${' '.repeat(spaceCounter + braceGap)}}`;
};

const textGap = 4;
const braceGap = 2;

const renderToObject = (tree, spaceCounter = braceGap) => {
  const typeMap = {
    added: ({ name, valueTo }, spaceCount = braceGap) => `${' '.repeat(spaceCount)}+ ${name}: ${stringify(valueTo, spaceCount)}`,

    deleted: ({ name, valueFrom }, spaceCount = braceGap) => `${' '.repeat(spaceCount)}- ${name}: ${stringify(valueFrom, spaceCount)}`,

    changeless: ({ name, valueTo }, spaceCount = braceGap) => `${' '.repeat(spaceCount)}  ${name}: ${stringify(valueTo, spaceCount)}`,

    nested: ({ children, name }, spaceCount = braceGap) => `${' '.repeat(spaceCount)}  ${name}: ${renderToObject(children, spaceCount + textGap)}`,

    changed: (el, spaceCount = braceGap) => `${typeMap.added(el, spaceCount)}\n${typeMap.deleted(el, spaceCount)}`,
  };

  const result = tree.map(el => typeMap[el.type](el, spaceCounter)).join('\n');

  return `{\n${result}\n${' '.repeat(spaceCounter - braceGap)}}`;
};

export default renderToObject;
