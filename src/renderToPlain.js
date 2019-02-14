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
    added: ({ name, valueTo }, path = []) => `Property '${[...path, name].join('.')}' was added with value: ${stringify(valueTo)}`,
    deleted: ({ name }, path = []) => `Property '${[...path, name].join('.')}' was removed`,
    changed: ({ name, valueFrom, valueTo }, path = []) => `Property '${[...path, name].join('.')}' was updated. From ${stringify(valueFrom)} to ${stringify(valueTo)}`,
    changeless: () => '',
    nested: ({ children, name }, path = []) => `${renderToPlain(children, [...path, name])}`,
  };

  const mapedTree = tree.map(el => typeMap[el.type](el, filePath));
  const flattenTree = _.flatten(mapedTree);
  const filteredTree = flattenTree.filter(el => el !== '');
  const result = filteredTree.join('\n');
  return result;
};

export default renderToPlain;
