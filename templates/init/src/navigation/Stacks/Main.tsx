import {screenOptions} from '@navigation/options';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Welcome } from '@screens/MainFlow/Welcome';
import React from 'react';


export type MainStackParamList = {
  Welcome: undefined;
};

export type EditScreenList = {
  [K in keyof MainStackParamList]: MainStackParamList[K] extends {
    isEdit: boolean;
  }
    ? K
    : never;
}[keyof MainStackParamList];

export type MainStackScreenList = {
  [K in keyof MainStackParamList]: MainStackParamList[K] extends undefined
    ? K
    : never;
}[keyof MainStackParamList];

const MainStack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="Welcome">
      <MainStack.Screen
        options={screenOptions}
        name="Welcome"
        component={Welcome}
      />
    </MainStack.Navigator>
  );
}
