import fs from 'fs/promises';
import path from 'path';

const packageJSONPath = path.resolve(__dirname, '..', 'package.json');

const getScriptsFromFile = (file: { [key: string]: any }): [string, unknown][] => Object.entries(file.scripts);

const mapScriptsToSelectList = (scripts: [string, unknown][]) => {
  return scripts.map(([script, command]) => ({ label: script, value: command }));
}

const parseScripts = async () => {
  try {
    const file = await fs.readFile(packageJSONPath, { encoding: 'utf-8' });
    return mapScriptsToSelectList(
      getScriptsFromFile(JSON.parse(file))
    )
  } catch (e) {
    console.error(e)
  }
};

export { parseScripts };
