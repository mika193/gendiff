const normalizeData = (data) => {
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    return keys.reduce((acc, key) => ({ ...acc, [key]: normalizeData(data[key]) }), {});
  }
  return !/\D/.test(data) ? parseInt(data, 10) : data;
};

const renderToJson = (tree) => {
  const typeMap = {
    added: ({ name, valueTo }) => ({ [`+ ${name}`]: normalizeData(valueTo) }),
    deleted: ({ name, valueFrom }) => ({ [`- ${name}`]: normalizeData(valueFrom) }),
    changed: ({ name, valueFrom, valueTo }) => ({ [`+ ${name}`]: normalizeData(valueTo), [`- ${name}`]: normalizeData(valueFrom) }),
    changeless: ({ name, valueTo }) => ({ [name]: normalizeData(valueTo) }),
    nested: ({ children, name }) => ({ [name]: JSON.parse(renderToJson(children)) }),
  };

  const reducedTree = tree.reduce((acc, el) => ({ ...acc, ...typeMap[el.type](el) }), {});
  const result = JSON.stringify(reducedTree);
  return result;
};

export default renderToJson;
