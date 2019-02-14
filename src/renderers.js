import renderToObject from './renderToObject';
import renderToPlain from './renderToPlain';
import renderToJSON from './renderToJSON';

const render = {
  object: renderToObject,
  plain: renderToPlain,
  json: renderToJSON,
};

export default (ast, format) => render[format](ast);
