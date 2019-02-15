import _ from 'lodash/fp';

const stringify = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (!/\D/.test(value) || typeof value === 'boolean') {
    return value;
  }

  return `'${value}'`;
};

const renderToPlain = (tree, filePath = []) => {
  const getstringStart = name => `Property '${[...filePath, name].join('.')}' was`;

  const typeMap = {
    added: ({ valueTo }, stringStart) => `${stringStart} added with value: ${stringify(valueTo)}`,
    deleted: (el, stringStart) => `${stringStart} removed`,
    changed: ({ valueFrom, valueTo }, stringStart) => `${stringStart} updated. From ${stringify(valueFrom)} to ${stringify(valueTo)}`,
    same: () => '',
    nested: ({ children, name }) => `${renderToPlain(children, [...filePath, name])}`,
  };

  const mapedTree = tree.map(el => typeMap[el.type](el, getstringStart(el.name)));
  const flattenTree = _.flatten(mapedTree);
  const filteredTree = flattenTree.filter(el => el !== '');
  const result = filteredTree.join('\n');
  return result;
};

export default renderToPlain;
