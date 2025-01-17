import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {isIOS} from '@services/platform';

export const screenOptions = {
  headerShown: false,
  animation: isIOS ? 'simple_push' : 'slide_from_right',
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
