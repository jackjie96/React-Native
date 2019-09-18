import { combineReducers } from 'redux';

import apiReducer from './apiReducer';

const rootReducer = combineReducers({
	repository: apiReducer,
});

export default rootReducer;