import {all, call, spawn} from 'redux-saga/effects';

const sagas: GeneratorFunction[] = [

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
