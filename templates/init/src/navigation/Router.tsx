import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {screenOptions} from './options';
import {MainNavigator, MainStackParamList} from './Stacks/Main';

export type RootRouterParamList = {
  MainNavigator: NavigatorScreenParams<MainStackParamList>;
};

export const navigationRef =
  createNavigationContainerRef<RootRouterParamList>();

const RootRouterStack = createNativeStackNavigator<RootRouterParamList>();

export function Router() {
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootRouterStack.Navigator
          screenOptions={screenOptions}
        >
          <RootRouterStack.Screen
            name="MainNavigator"
            component={MainNavigator}
          />
        </RootRouterStack.Navigator>
      </NavigationContainer>
    </>
  );
}
