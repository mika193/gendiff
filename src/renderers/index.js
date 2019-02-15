import renderToObject from './renderToObject';
import renderToPlain from './renderToPlain';

const render = {
  object: renderToObject,
  plain: renderToPlain,
  json: JSON.stringify,
};

export default (ast, format) => render[format](ast);
