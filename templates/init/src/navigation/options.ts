import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const screenOptions = {
  headerShown: false,
  animation: 'simple_push',
} as NativeStackNavigationOptions;

export const screenWithGoBack = {
  fullScreenGestureEnabled: true,
  headerShown: true,
} as NativeStackNavigationOptions;

export const fadeScreenWithGoBack = {
  ...screenWithGoBack,
  animation: 'fade_from_bottom',
} as NativeStackNavigationOptions;

export const tabOptions = {
  headerShown: false,
  lazy: true,
};
