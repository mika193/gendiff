const normalizeData = (data) => {
  if (typeof data === 'object') {
    const keys = Object.keys(data);
    return keys.reduce((acc, key) => ({ ...acc, [key]: normalizeData(data[key]) }), {});
  }
  return !/\D/.test(data) ? parseInt(data, 10) : data;
};

export default class RenderToPlain {
  added = ({ name, valueTo }) => ({ [`+ ${name}`]: normalizeData(valueTo) });

  deleted = ({ name, valueFrom }) => ({ [`- ${name}`]: normalizeData(valueFrom) });

  changed = ({ name, valueFrom, valueTo }) => ({ [`+ ${name}`]: normalizeData(valueTo), [`- ${name}`]: normalizeData(valueFrom) });

  changeless({ children, name, valueTo }) {
    const value = children.length > 0 ? JSON.parse(this.iter(children)) : normalizeData(valueTo);
    return { [name]: value };
  }

  iter = (tree) => {
    const reducedTree = tree.reduce((acc, el) => ({ ...acc, ...this[el.type](el) }), {});
    const result = JSON.stringify(reducedTree);
    return result;
  }
}
