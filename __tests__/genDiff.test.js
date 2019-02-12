import fs from 'fs';
import genDiff from '../src';

describe('test genDiff', () => {
  const resultPath = '././__tests__/__fixtures__/result.txt';
  const result = fs.readFileSync(resultPath, 'utf-8');

  const fileTypes = ['json', 'yml', 'ini'];

  test.each(fileTypes)(
    'findig diff between %s files',
    (type) => {
      const before = `././__tests__/__fixtures__/before.${type}`;
      const after = `././__tests__/__fixtures__/after.${type}`;
      expect(genDiff(before, after)).toBe(result);
    },
  );
});
