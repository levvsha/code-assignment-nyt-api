import * as newsActionTypes from 'constants/NewsConstants';

export const getInitialState = () => ({
  isLoading: false,
  searchQuery: 'amsterdam',
  newsList: [],
  expandedNewsId: null,
  pageOffset: 0,
  errorMessage: null
});

const initialState = getInitialState();

export default function news(state = initialState, action) {
  const {
    type,
    searchQuery,
    newsList,
    expandedNewsId,
    errorMessage
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
        newsList,
        expandedNewsId: null,
        pageOffset: 1
      };

    case newsActionTypes.ADD_NEW_ITEMS:
      return {
        ...state,
        newsList: state.newsList.concat(newsList),
        pageOffset: state.pageOffset + 1
      };

    case newsActionTypes.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery
      };

    case newsActionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage
      };

    case newsActionTypes.SET_EXPANDED_NEWS_ID:
      return {
        ...state,
        expandedNewsId
      };

    default:
      return state;
  }
}
