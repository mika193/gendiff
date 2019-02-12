import yaml from 'js-yaml';
import { decode } from 'ini';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: decode,
};

export default (file, format) => parse[format](file);
