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

export default class RenderToObject {
  constructor() {
    this.textGap = 4;
    this.braceGap = 2;
    this.spaceCounter = 2;
  }

  added({ name, valueTo }, spaceCounter = this.spaceCounter) {
    return `${' '.repeat(spaceCounter)}+ ${name}: ${stringify(valueTo, spaceCounter)}`;
  }

  deleted({ name, valueFrom }, spaceCounter = this.spaceCounter) {
    return `${' '.repeat(spaceCounter)}- ${name}: ${stringify(valueFrom, spaceCounter)}`;
  }

  changeless({ children, name, valueTo }, spaceCounter = this.spaceCounter) {
    const value = children.length > 0 ? `${this.iter(children, spaceCounter + this.textGap)}` : `${stringify(valueTo, spaceCounter)}`;
    return `${' '.repeat(spaceCounter)}  ${name}: ${value}`;
  }

  changed(el, spaceCounter = this.spaceCounter) {
    return `${this.added(el, spaceCounter)}\n${this.deleted(el, spaceCounter)}`;
  }

  iter(tree, spaceCounter = this.spaceCounter) {
    const result = tree.map(el => this[el.type](el, spaceCounter)).join('\n');

    return `{\n${result}\n${' '.repeat(spaceCounter - this.braceGap)}}`;
  }
}
