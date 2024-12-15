import {TEMPLATECActions} from "@store/modules/TEMPLATEC/actions";
import {all, takeLatest} from "redux-saga/effects";

import {templateSaga} from "./templateSaga";

export function* rootTEMPLATECSaga() {
  yield all([
    takeLatest(TEMPLATECActions.ACTION_SAMPLE.START.type, templateSaga),
  ]);
}
