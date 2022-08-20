import React from 'react';
import { MantineProvider } from '@mantine/core';

import Clubs from './views/Clubs';
import Jobs from './views/Jobs';
class App extends React.Component {

  render() {
    return (
      <MantineProvider>
        <Jobs />
        <Clubs />
      </MantineProvider>
    );
  }
}

export default App;
