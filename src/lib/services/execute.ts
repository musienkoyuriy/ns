import { spawn } from 'child_process';

const mapCommandToSpawnReadable = (script: string) => {
  const splittedCommand = script.split(' ');
  const command = splittedCommand[0];
  const args = splittedCommand.slice(1);

  return {
    command,
    args
  };
}

export const execute = (script: string): void => {
  if (!script) {
    return;
  }

  const { command, args } = mapCommandToSpawnReadable(script);

  const child = spawn(command, args);

  child.stdout.on('data', data => {
    process.stdout.write(data);
  });

  child.stderr.on('data', err => {
    console.log(`stderr: `, err);
  });

  child.on('exit', (code, signal) => {
    console.log(`stdout: `, code);
    console.log(`exit code: ${signal}`)
    console.log('FINISHED!!!');
  });
}
