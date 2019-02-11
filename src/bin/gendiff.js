#!/usr/bin/env node
import commander from '../commander';

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  commander('help');
}
