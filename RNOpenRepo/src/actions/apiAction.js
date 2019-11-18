import {
  GET_RN_OPEN_REPO,
  PULL_REFRESH_RN_OPEN_REPO,
  SEARCH_REPO,
} from './actionTypes';

export const getRNOpenRepo = (page = 1, dispLimit = 15) => ({
  type: GET_RN_OPEN_REPO,
  page,
  dispLimit,
});

export const pullToRefreshRNOpenRepo = () => ({
  type: PULL_REFRESH_RN_OPEN_REPO,
});

export const searchRepo = (keyword, page = 1, dispLimit = 15) => ({
  type: SEARCH_REPO,
  keyword,
  page,
  dispLimit,
});
