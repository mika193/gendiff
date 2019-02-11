import commander from 'commander';
import genDiff from '.';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((path1, path2) => console.log(genDiff(path1, path2)))
  .parse(process.argv);

const programMap = {
  help: program.help,
};

export default (args) => {
  args.forEach(arg => programMap[arg]());
};
