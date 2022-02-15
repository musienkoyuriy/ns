import React from 'react';
import SelectInput from 'ink-select-input';
import { Text } from 'ink';
import { parseScripts } from '@app/lib/services/parse-scripts';

const ScriptsList: React.FC = (_): JSX.Element => {
  const [selectedScript, setSelectedScript] = React.useState<string>('First');
  const [npmScripts, setNpmScripts] = React.useState([]);

  React.useEffect(() => {
    parseScripts().then(scripts => setNpmScripts(scripts));
  }, []);

  const handleSelect = item => {
    setSelectedScript(item.label)
  };

  return <>
    <Text>{selectedScript}</Text>
    <SelectInput items={npmScripts} onSelect={handleSelect} />
  </>
};

export default ScriptsList;
