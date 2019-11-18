import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_RN_OPEN_REPO,
  RECEIVE_RN_OPEN_REPO,
  SEARCH_REPO,
  SEARCH_REPO_RESULT,
} from '../actions/actionTypes';

function* getRNOpenRepo(action) {
  try {
    let {data} = yield axios.get(
      `https://api.github.com/orgs/react-native-community/repos?page=${action.page}&per_page=${action.dispLimit}`,
    );

    yield put({
      type: RECEIVE_RN_OPEN_REPO,
      isLoading: false,
      data,
    });
  } catch (error) {
    console.log('ERROR (getRNOpenRepo) from saga: ', error);
  }
}

export function* getRNOpenRepoWatcher() {
  yield takeLatest(GET_RN_OPEN_REPO, getRNOpenRepo);
}

function* searchRepo(action) {
  try {
    let {data} = yield axios.get(
      `https://api.github.com/search/repositories?q=${action.keyword}&page=${action.page}&per_page=${action.dispLimit}`,
    );
    let newSearch = action.page === 1 ? true : false;

    yield put({
      type: SEARCH_REPO_RESULT,
      isLoading: false,
      data: data.items,
      newSearch,
    });
  } catch (error) {
    console.log('ERROR (searchRepo) from saga: ', error);
  }
}

export function* searchRepoWatcher() {
  yield takeLatest(SEARCH_REPO, searchRepo);
}
