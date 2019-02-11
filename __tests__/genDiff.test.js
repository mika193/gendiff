import fs from 'fs';
import genDiff from '../src';

const path1 = '././__tests__/__fixtures__/before.json';
const path2 = '././__tests__/__fixtures__/after.json';
const resultPath = '././__tests__/__fixtures__/result.txt';
const result = fs.readFileSync(resultPath, 'utf-8');

test('findig diff between files', () => {
  expect(genDiff(path1, path2)).toBe(result);
});
