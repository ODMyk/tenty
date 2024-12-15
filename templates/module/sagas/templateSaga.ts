import {getErrorMessage} from "@store/utils/errors";
import {put} from "redux-saga/effects";

import {TEMPLATECActions} from "@store/modules/TEMPLATEC/actions";

const actionCreate = TEMPLATECActions.ACTION_SAMPLE.START.create;

export function* templateSaga({}: ReturnType<typeof actionCreate>) {
  try {
    yield put(TEMPLATECActions.ACTION_SAMPLE.SUCCESS.create());
  } catch (error) {
    yield put(
      TEMPLATECActions.ACTION_SAMPLE.FAILED.create({
        errorMessage: getErrorMessage(error),
      }),
    );
  }
}
