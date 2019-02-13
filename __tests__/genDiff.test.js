import fs from 'fs';
import genDiff from '../src';

describe('test genDiff', () => {
  const flatResultPath = '././__tests__/__fixtures__/result.txt';
  const flatResult = fs.readFileSync(flatResultPath, 'utf-8');
  const flatFileTypes = ['json', 'yml', 'ini'];

  const treeResultPath = '././__tests__/__fixtures__/resultTree.txt';
  const treeResult = fs.readFileSync(treeResultPath, 'utf-8');
  const treeFileTypes = ['json', 'yml', 'ini'];

  test.each(flatFileTypes)(
    'findig diff between flat %s files',
    (type) => {
      const before = `././__tests__/__fixtures__/before.${type}`;
      const after = `././__tests__/__fixtures__/after.${type}`;
      expect(genDiff(before, after)).toBe(flatResult);
    },
  );

  test.each(treeFileTypes)(
    'findig diff between tree %s files',
    (type) => {
      const before = `././__tests__/__fixtures__/beforeTree.${type}`;
      const after = `././__tests__/__fixtures__/afterTree.${type}`;
      expect(genDiff(before, after)).toBe(treeResult);
    },
  );
});
