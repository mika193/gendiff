import fs from 'fs';
import genDiff from '../src';

describe('test genDiff', () => {
  const flatResultPath = '././__tests__/__fixtures__/result.txt';
  const flatResult = fs.readFileSync(flatResultPath, 'utf-8');

  const treeResultPath = '././__tests__/__fixtures__/resultTree.txt';
  const treeResult = fs.readFileSync(treeResultPath, 'utf-8');

  const plainResultPath = '././__tests__/__fixtures__/resultPlain.txt';
  const plainResult = fs.readFileSync(plainResultPath, 'utf-8');

  const plainTreeResultPath = '././__tests__/__fixtures__/resultPlainTree.txt';
  const plainTreeResult = fs.readFileSync(plainTreeResultPath, 'utf-8');

  const fileTypes = ['json', 'yml', 'ini'];

  describe.each(fileTypes)(
    'findig diff between %s files',
    (type) => {
      const before = `././__tests__/__fixtures__/before.${type}`;
      const after = `././__tests__/__fixtures__/after.${type}`;
      const beforeTree = `././__tests__/__fixtures__/beforeTree.${type}`;
      const afterTree = `././__tests__/__fixtures__/afterTree.${type}`;

      test('flat object', () => {
        expect(genDiff(before, after)).toBe(flatResult);
      });

      test('flat plain', () => {
        expect(genDiff(before, after, 'plain')).toBe(plainResult);
      });

      test('tree object', () => {
        expect(genDiff(beforeTree, afterTree)).toBe(treeResult);
      });

      test('tree plain', () => {
        expect(genDiff(beforeTree, afterTree, 'plain')).toBe(plainTreeResult);
      });
    },
  );
});
