import {configureStore, Reducer} from '@reduxjs/toolkit';
import {asyncReduxStorage} from '@services/mmkv';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './rootReducer';
import {rootSaga} from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage: asyncReduxStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as unknown as Reducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export const configuredStore = {
  store,
  persistor,
};
