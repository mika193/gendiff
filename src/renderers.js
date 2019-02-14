import RenderToObject from './RenderToObject';
import RenderToPlain from './RenderToPlain';
import RenderToJSON from './RenderToJSON';

class Render {
  constructor(format) {
    this.format = format;
    this.formatMap = {
      object: new RenderToObject(),
      plain: new RenderToPlain(),
      json: new RenderToJSON(),
    };
  }

  iter(ast) {
    return this.formatMap[this.format].iter(ast);
  }
}
export default (ast, format) => new Render(format).iter(ast);
