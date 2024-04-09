import { combineReducers } from 'redux';
import initialValuesReducer from './initialValuesReducer';
import graphReducer from './savingGraphReducer';
import decadeOneReducer from './decadeOneReducer';
import decadeTwoReducer from './decadeTwoReducer';
import decadeThreeReducer from './decadeThreeReducer';

const rootReducer = combineReducers({
  initialPage: initialValuesReducer,
  graphPage: graphReducer,
  decadeOnePage: decadeOneReducer,
  decadeTwoPage: decadeTwoReducer,
  decadeThreePage: decadeThreeReducer,
});

export default rootReducer;