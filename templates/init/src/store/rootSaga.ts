import {all, AllEffect, call, ForkEffect, spawn} from 'redux-saga/effects';

type Saga =
  | (() => Generator<ForkEffect<void>, void, unknown>)
  | (() => Generator<AllEffect<ForkEffect<never>>, void, unknown>);

const sagas: Saga[] = [
  
];

export function* rootSaga() {
  yield all([
    ...sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (error) {}
        }
      }),
    ),
  ]);
}
