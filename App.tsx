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
import {theme} from './helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-native-paper';
import {ThemeType} from './types';
import {useRecoilState} from 'recoil';
import {themeState} from './atoms';
import {StatusBar, SafeAreaView, Image} from 'react-native';
import styled, {ThemeProvider} from 'styled-components';
import {Loading} from './components/Loading';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState<ThemeType>(themeState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const previousTheme = await AsyncStorage.getItem('theme');
        if (previousTheme === 'light') {
          setCurrentTheme('light');
        }
      } catch (err) {
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
        <Provider>
          <ThemeProvider theme={() => theme(currentTheme)}>
            <PublicRoutes />
          </ThemeProvider>
        </Provider>
      )}
    </>
  );
};

export default App;
