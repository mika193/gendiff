import commander from 'commander';

const program = commander;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig>')
  .arguments('<secondConfig>')
  .parse(process.argv);

const programMap = {
  help: program.help,
};

export default (args) => {
  args.forEach(arg => programMap[arg]());
};
