import { exec } from 'child_process';

export const execute = (script: string) => {
  exec(`npm run ${script}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
    }
    console.log(stdout)
    process.exit(1);
  });
}
