import {createAction} from "@store/utils/actions/createAction";

const ACTION_SAMPLE = createAction("ACTION_SAMPLE", {
  START: () => {},
  SUCCESS: () => {},
});

export const TEMPLATECActions = Object.freeze({
  ACTION_SAMPLE,
});
