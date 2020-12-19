/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {PublicRoutes} from './routes';
import {theme, ThemeContext} from './helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-native-paper';
import {ThemeType} from './types';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {Loading} from './components';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const previousTheme = await AsyncStorage.getItem('theme');
        if (previousTheme === 'light') {
          setCurrentTheme('light');
        }
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={currentTheme === 'light' ? '#CCCCCC' : '#20232A'}
      />
      {loading ? (
        <Loading />
      ) : (
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
          <Provider>
            <ThemeProvider theme={() => theme(currentTheme)}>
              <PublicRoutes />
            </ThemeProvider>
          </Provider>
        </ThemeContext.Provider>
      )}
    </>
  );
};

export default App;
