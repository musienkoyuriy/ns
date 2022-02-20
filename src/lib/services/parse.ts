import fs from 'fs/promises';
import path from 'path';

const packageJSONPath = path.resolve(__dirname, '..', 'package.json');

const getScriptsFromFile = (file: { [key: string]: any }): string[] => Object.keys(file.scripts);

const mapScriptsToSelectList = (scripts: string[]) => {
  return scripts.map((script: string) => ({ label: script, value: script }));
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
