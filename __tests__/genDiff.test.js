import fs from 'fs';
import genDiff from '../src';

describe('test genDiff', () => {
  const resultPath = '././__tests__/__fixtures__/result.txt';
  const result = fs.readFileSync(resultPath, 'utf-8');

  const jsonTestParams = {
    path1: '././__tests__/__fixtures__/before.json',
    path2: '././__tests__/__fixtures__/after.json',
  };

  const yamlTestParams = {
    path1: '././__tests__/__fixtures__/before.yml',
    path2: '././__tests__/__fixtures__/after.yml',
  };

  test('findig diff between JSON files', () => {
    expect(genDiff(jsonTestParams.path1, jsonTestParams.path2)).toBe(result);
  });

  test('findig diff between yaml files', () => {
    expect(genDiff(yamlTestParams.path1, yamlTestParams.path2)).toBe(result);
  });
});
