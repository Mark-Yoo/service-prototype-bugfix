import { combineReducers } from 'redux';
import postInfo from './postInfo';
import getOrder from './getOrder';

const rootReducer = combineReducers({ postInfo, getOrder });

export default rootReducer;
