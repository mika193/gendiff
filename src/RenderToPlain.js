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

export default class RenderToPlain {
  constructor() {
    this.filePath = [];
  }

  added({ name, valueTo }, filePath = this.filePath) {
    return `Property '${[...filePath, name].join('.')}' was added with value: ${stringify(valueTo)}`;
  }

  deleted({ name }, filePath = this.filePath) {
    return `Property '${[...filePath, name].join('.')}' was removed`;
  }

  changed({ name, valueFrom, valueTo }, filePath = this.filePath) {
    return `Property '${[...filePath, name].join('.')}' was updated. From ${stringify(valueFrom)} to ${stringify(valueTo)}`;
  }

  changeless({ children, name }, filePath = this.filePath) {
    return children.length > 0 ? `${this.iter(children, [...filePath, name])}` : '';
  }

  iter(tree, filePath = this.filePath) {
    const mapedTree = tree.map(el => this[el.type](el, filePath));
    const flattenTree = _.flatten(mapedTree);
    const filteredTree = flattenTree.filter(el => el !== '');
    const result = filteredTree.join('\n');
    return result;
  }
}
