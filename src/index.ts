#!/usr/bin/env node

import { Command } from 'commander';
import { GitPilotApp } from './core/app';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const program = new Command();
const app = new GitPilotApp();

program
  .name('gitpilot')
  .version('1.0.0');

program
  .command('start')
  .action(() => app.start());

program
  .command('analyze')
  .action(() => app.analyze());

program
  .command('maintain')
  .action(() => app.maintain());

program.parse(process.argv);