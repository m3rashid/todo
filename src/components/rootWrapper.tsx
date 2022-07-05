import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core';
import React from 'react';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

import Header from 'components/header';

interface IProps {
  children: React.ReactNode;
}

const RootWrapper: React.FC<IProps> = ({ children }) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    localStorage.setItem('theme', colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider limit={5} position="bottom-right">
          <ModalsProvider>
            <Header
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
              userName="MD Rashid Hussain"
            />
            {children}
            {/* <Footer /> */}
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default RootWrapper;
