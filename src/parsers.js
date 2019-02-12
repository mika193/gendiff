import yaml from 'js-yaml';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (file, format) => parse[format](file);
