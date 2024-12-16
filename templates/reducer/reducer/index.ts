import {produce} from "immer";

import {TEMPLATECActions} from "@store/modules/TEMPLATEC/actions";

interface TEMPLATECState {
  templateField: number;
}

const INITIAL_STATE: TEMPLATECState = {
  templateField: 0,
};

type Actions = ReturnType<typeof TEMPLATECActions.ACTION_SAMPLE.START.create>;

export function TEMPLATELReducer(
  state = INITIAL_STATE,
  action: Actions,
): TEMPLATECState {
  return produce(state, (draft) => {
    switch (action.type) {
      case TEMPLATECActions.ACTION_SAMPLE.START.type:
        draft.templateField = 1;
        break;
    }
  });
}
