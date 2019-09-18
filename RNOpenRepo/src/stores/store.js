import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import rootReducer from '../reducers/index';

import { rootSaga } from '../sagas/index';

const sagaMiddleware = createSagaMiddleWare();

const store = createStore(
	rootReducer,
	applyMiddleware(
		sagaMiddleware,
	),
);

sagaMiddleware.run(rootSaga);

export {
	store,
}