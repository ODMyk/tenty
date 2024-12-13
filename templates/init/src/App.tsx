import {Fallback} from '@components/core/Fallback';
import {Router} from '@navigation/Router';
import {configuredStore} from '@store/configureStore';
import React from 'react';
import {LogBox} from 'react-native';
import {Dimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const {fontScale} = Dimensions.get('window');

export const isFontScaling = fontScale > 1;

enableFreeze();

export function App(): JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <Fallback>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Provider store={configuredStore.store}>
            <PersistGate persistor={configuredStore.persistor}>
              <Router />
            </PersistGate>
          </Provider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Fallback>
  );
}
