import fs from 'fs';
import path from 'path';
import parse from './parsers';
import getAST from './getAST';
import render from './renderers';

const getObject = (filePath) => {
  const file = fs.readFileSync(filePath, 'utf-8');
  const fileFormat = path.extname(filePath).split('.')[1];
  return parse(file, fileFormat);
};

const genDiff = (path1, path2, format = 'object') => {
  const obj1 = getObject(path1);
  const obj2 = getObject(path2);
  const ast = getAST(obj1, obj2);

  return render(ast, format);
};

export default genDiff;
