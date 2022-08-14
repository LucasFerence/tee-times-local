import React from 'react';
import { MantineProvider } from '@mantine/core';

import Clubs from './views/Clubs';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import UserProfile from './user/UserProfile';

class App extends React.Component {

  render() {
    return (
      <MantineProvider>

        <LoginButton />
        <LogoutButton />
        <UserProfile />
        
        <Clubs />

      </MantineProvider>
    );
  }
}

export default App;
