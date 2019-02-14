import _ from 'lodash';

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
  const typeMap = {
    added: ({ name, valueTo }) => `Property '${[...filePath, name].join('.')}' was added with value: ${stringify(valueTo)}`,
    deleted: ({ name }) => `Property '${[...filePath, name].join('.')}' was removed`,
    changed: ({ name, valueFrom, valueTo }) => `Property '${[...filePath, name].join('.')}' was updated. From ${stringify(valueFrom)} to ${stringify(valueTo)}`,
    same: () => '',
    nested: ({ children, name }) => `${renderToPlain(children, [...filePath, name])}`,
  };

  const mapedTree = tree.map(el => typeMap[el.type](el));
  const flattenTree = _.flatten(mapedTree);
  const filteredTree = flattenTree.filter(el => el !== '');
  const result = filteredTree.join('\n');
  return result;
};

export default renderToPlain;
