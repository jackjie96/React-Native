import { all, fork } from 'redux-saga/effects';

import { getRNOpenRepoWatcher, searchRepoWatcher } from './apiSaga';

export function* rootSaga() {
	yield all([
		fork(getRNOpenRepoWatcher),
		fork(searchRepoWatcher),
	]);
}