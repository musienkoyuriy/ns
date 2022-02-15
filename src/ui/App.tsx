import React from 'react';
import { Box } from 'ink';
import ScriptsList from './components/ScriptsList';

const App: React.FC = (): JSX.Element => {
  return <Box flexDirection='column'>
    <ScriptsList />
  </Box>
}

export default App;
