import * as newsActionTypes from 'constants/NewsConstants';

const initialState = {
  isLoading: false,
  searchQuery: 'amsterdam',
  newsList: null,
  expandedNewsId: null
};

export default function game(state = initialState, action) {
  const {
    type,
    // searchQuery,
    newsList,
    expandedNewsId
  } = action;

  switch (type) {
    case newsActionTypes.START_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case newsActionTypes.FINISH_REQUEST:
      return {
        ...state,
        isLoading: false
      };

    case newsActionTypes.SET_LIST:
      return {
        ...state,
        newsList
      }

    case newsActionTypes.SET_EXPANDED_NEWS_ID:
      return {
        ...state,
        expandedNewsId
      }

    default:
      return state;
  }
}
