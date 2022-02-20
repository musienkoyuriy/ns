import React from 'react';
import SelectInput from 'ink-select-input';
import { parseScripts } from '@app/lib/services/parse';
import { execute } from '@app/lib/services/execute';

const ScriptsList: React.FC = (_): JSX.Element => {
  const [npmScripts, setNpmScripts] = React.useState([]);

  React.useEffect(() => {
    parseScripts().then(scripts => setNpmScripts(scripts));
  }, []);

  const handleSelect = React.useCallback(item => {
    execute(item.value)
  }, []);

  return <SelectInput items={npmScripts} onSelect={handleSelect} />
};

export default ScriptsList;
