import {combineReducers} from 'redux';

import {processStatusesReducer} from './modules/UtilityProcessStatuses/reducer';

export const rootReducer = combineReducers({

  utilityProcessStatuses: processStatusesReducer,

});

export type RootState = ReturnType<typeof rootReducer>;
