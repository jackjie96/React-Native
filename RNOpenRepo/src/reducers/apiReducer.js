import {
  GET_RN_OPEN_REPO,
  RECEIVE_RN_OPEN_REPO,
  PULL_REFRESH_RN_OPEN_REPO,
  SEARCH_REPO,
  SEARCH_REPO_RESULT,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  rnOpenRepoData: [],
  searchRepoData: [],
  isLoading: false,
};

const apiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RN_OPEN_REPO: {
      return {...state, isLoading: true};
    }

    case RECEIVE_RN_OPEN_REPO: {
      return {
        ...state,
        isLoading: action.isLoading,
        rnOpenRepoData: state.rnOpenRepoData.concat(action.data),
      };
    }

    case PULL_REFRESH_RN_OPEN_REPO: {
      return {...state, isLoading: true, rnOpenRepoData: []};
    }

    case SEARCH_REPO: {
      return {...state, isLoading: true};
    }

    case SEARCH_REPO_RESULT: {
      if (action.newSearch) {
        return {
          ...state,
          isLoading: action.isLoading,
          searchRepoData: action.data,
        };
      } else {
        return {
          ...state,
          isLoading: action.isLoading,
          searchRepoData: state.searchRepoData.concat(action.data),
        };
      }
    }

    default: {
      return state;
    }
  }
};

export default apiReducer;
