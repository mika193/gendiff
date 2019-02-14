import renderToObject from './renderers/renderToObject';
import renderToPlain from './renderers/renderToPlain';

const render = {
  object: renderToObject,
  plain: renderToPlain,
  json: JSON.stringify,
};

export default (ast, format) => render[format](ast);
