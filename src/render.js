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

class RenderToObject {
  constructor() {
    this.textGap = 4;
    this.braceGap = 2;
    this.spaceCounter = 2;
  }

  added(el, spaceCounter = this.spaceCounter) {
    return `${' '.repeat(spaceCounter)}+ ${el.name}: ${stringify(el.valueTo, spaceCounter)}`;
  }

  deleted(el, spaceCounter = this.spaceCounter) {
    return `${' '.repeat(spaceCounter)}- ${el.name}: ${stringify(el.valueFrom, spaceCounter)}`;
  }

  changeless(el, spaceCounter = this.spaceCounter) {
    const value = el.children.length > 0 ? `${this.iter(el.children, spaceCounter + this.textGap)}` : `${stringify(el.valueTo, spaceCounter)}`;
    return `${' '.repeat(spaceCounter)}  ${el.name}: ${value}`;
  }

  changed(el, spaceCounter = this.spaceCounter) {
    return `${this.added(el, spaceCounter)}\n${this.deleted(el, spaceCounter)}`;
  }

  iter(tree, spaceCounter = this.spaceCounter) {
    const result = tree.map(el => this[el.type](el, spaceCounter)).join('\n');

    return `{\n${result}\n${' '.repeat(spaceCounter - this.braceGap)}}`;
  }
}

export default ast => new RenderToObject().iter(ast);
