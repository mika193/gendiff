#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'object')
  .arguments('<firstConfig> <secondConfig>')
  .action((path1, path2, command) => console.log(genDiff(path1, path2, command.format)))
  .parse(process.argv);
