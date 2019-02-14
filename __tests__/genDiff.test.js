import fs from 'fs';
import genDiff from '../src';

describe('test genDiff', () => {
  const flatResultPath = '././__tests__/__fixtures__/result.txt';
  const flatResult = fs.readFileSync(flatResultPath, 'utf-8');
  const flatFileTypes = ['json', 'yml', 'ini'];

  const treeResultPath = '././__tests__/__fixtures__/resultTree.txt';
  const treeResult = fs.readFileSync(treeResultPath, 'utf-8');
  const treeFileTypes = ['json', 'yml', 'ini'];

  const plainResultPath = '././__tests__/__fixtures__/resultPlain.txt';
  const plainResult = fs.readFileSync(plainResultPath, 'utf-8');

  const plainTreeResultPath = '././__tests__/__fixtures__/resultPlainTree.txt';
  const plainTreeResult = fs.readFileSync(plainTreeResultPath, 'utf-8');

  const jsonResultPath = '././__tests__/__fixtures__/resultJSON.txt';
  const jsonResult = fs.readFileSync(jsonResultPath, 'utf-8');

  const jsonTreeResultPath = '././__tests__/__fixtures__/resultTreeJSON.txt';
  const jsonTreeResult = fs.readFileSync(jsonTreeResultPath, 'utf-8');

  test.each(flatFileTypes)(
    'findig diff between flat %s files. Show object',
    (type) => {
      const before = `././__tests__/__fixtures__/before.${type}`;
      const after = `././__tests__/__fixtures__/after.${type}`;
      expect(genDiff(before, after)).toBe(flatResult);
    },
  );

  test.each(flatFileTypes)(
    'findig diff between flat %s files. Show plain',
    (type) => {
      const before = `././__tests__/__fixtures__/before.${type}`;
      const after = `././__tests__/__fixtures__/after.${type}`;
      expect(genDiff(before, after, 'plain')).toBe(plainResult);
    },
  );

  test.each(flatFileTypes)(
    'findig diff between flat %s files. Show JSON',
    (type) => {
      const before = `././__tests__/__fixtures__/before.${type}`;
      const after = `././__tests__/__fixtures__/after.${type}`;
      expect(genDiff(before, after, 'json')).toBe(jsonResult);
    },
  );

  test.each(treeFileTypes)(
    'findig diff between tree %s files. Show object',
    (type) => {
      const before = `././__tests__/__fixtures__/beforeTree.${type}`;
      const after = `././__tests__/__fixtures__/afterTree.${type}`;
      expect(genDiff(before, after)).toBe(treeResult);
    },
  );

  test.each(treeFileTypes)(
    'findig diff between tree %s files. Show plain',
    (type) => {
      const before = `././__tests__/__fixtures__/beforeTree.${type}`;
      const after = `././__tests__/__fixtures__/afterTree.${type}`;
      expect(genDiff(before, after, 'plain')).toBe(plainTreeResult);
    },
  );

  test.each(treeFileTypes)(
    'findig diff between tree %s files. Show JSON',
    (type) => {
      const before = `././__tests__/__fixtures__/beforeTree.${type}`;
      const after = `././__tests__/__fixtures__/afterTree.${type}`;
      expect(genDiff(before, after, 'json')).toBe(jsonTreeResult);
    },
  );
});
