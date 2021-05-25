/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {PublicRoutes} from './routes';
import {Provider} from 'react-native-paper';
import {StyleProvider} from './contexts';

const App = () => {
  return (
    <Provider>
      <StyleProvider>
        <PublicRoutes />
      </StyleProvider>
    </Provider>
  );
};

export default App;
