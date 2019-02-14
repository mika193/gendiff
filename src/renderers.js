import RenderToObject from './RenderToObject';
import RenderToPlain from './RenderToPlain';

class Render {
  constructor(format) {
    this.format = format;
    this.formatMap = {
      object: new RenderToObject(),
      plain: new RenderToPlain(),
    };
  }

  iter(ast) {
    return this.formatMap[this.format].iter(ast);
  }
}
export default (ast, format) => new Render(format).iter(ast);
