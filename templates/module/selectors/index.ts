import {RootState} from "@store/rootReducer";

export const templateFieldSelector = (state: RootState) =>
  state.TEMPLATELReducer.templateField;
