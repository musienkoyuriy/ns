import { spawn } from 'child_process';
import { findLastIndex, trimQuotes } from '../utils';

const ENV_VARIABLE_REGEXP = /\w\s{0,}=\s{0,}\'{0,}\"{0,}\w\'{0,}\"{0,}/;

const mapCommandToSpawnReadable = (script: string) => {
  const splittedCommand = script.split(' ');
  const envVarsLastIndex = findLastIndex(splittedCommand, token => ENV_VARIABLE_REGEXP.test(token));

  const envVars = envVarsLastIndex !== -1 ?
    splittedCommand.slice(0, envVarsLastIndex + 1)
      .reduce((acc: { [key: string]: string }, envVar: string) => {
        const [variable, value] = envVar.split('=');

        acc = {
          ...acc,
          [variable]: trimQuotes(value)
        };

        return acc;
      }, {}) : {};

  const command = envVarsLastIndex !== -1 ? splittedCommand[envVarsLastIndex + 1] : splittedCommand[0];
  const args = splittedCommand.slice(
    envVarsLastIndex !== -1 ? envVarsLastIndex + 1 : 1
  );

  return {
    command,
    args,
    envVars
  };
}

export const execute = (script: string): void => {
  if (!script) {
    return;
  }

  const { command, args, envVars } = mapCommandToSpawnReadable(script);

  const child = spawn(command, args, {
    env: {
      ...process.env,
      ...envVars
    }
  });

  child.stdout.on('data', data => {
    process.stdout.write(data);
  });

  child.stderr.on('data', err => {
    process.stderr.write(`stderr: `, err);
  });

  child.on('exit', () => {
    process.stdout.write('✅ Finished!');
    process.exit(0);
  });
}
