import {navigationRef, RootRouterParamList} from '@navigation/Router';
import {ParamListBase} from '@react-navigation/native';

type NavigationParams = Parameters<typeof navigationRef.navigate>;

export function navigate(...params: NavigationParams) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...params);
  }
}

interface ResetNavigate<T extends ParamListBase, S extends ParamListBase> {
  stack: keyof RootRouterParamList;
  innerStack: keyof T;
  screen?: keyof S;
  params?: Record<string, string>;
}

export function resetNavigate<
  T extends ParamListBase,
  S extends ParamListBase,
>({stack, innerStack, screen = '', params}: ResetNavigate<T, S>) {
  if (
    navigationRef.isReady() &&
    typeof innerStack === 'string' &&
    typeof screen === 'string' &&
    navigationRef.getCurrentRoute()?.name !== innerStack
  ) {
    const state = {name: innerStack};
    screen && Object.assign(state, {state: {routes: [{name: screen, params}]}});

    navigationRef.resetRoot({
      index: 0,
      routes: [
        {
          name: stack,
          state: {
            routes: [state],
          },
          params: undefined,
        },
      ],
    });
  }
}
