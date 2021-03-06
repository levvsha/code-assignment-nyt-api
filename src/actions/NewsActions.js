import format from 'date-fns/format';
import _find from 'lodash.find';

import config from 'config';
import * as newsActionTypes from 'constants/NewsConstants';
import * as newsAPI from 'api/newsAPI';

/*
  Set active (expanded) news ID
 */
export function toggleNewsCondition(id) {
  return {
    type: newsActionTypes.SET_EXPANDED_NEWS_ID,
    expandedNewsId: id
  }
}
/*
  Update search field value
 */
export function updateSearchQuery(event) {
  return {
    type: newsActionTypes.UPDATE_SEARCH_QUERY,
    searchQuery: event.target.value
  }
}

/*
  Request news list
 */
export function getNews(searchQuery, isLoadMore) {
  return async (dispatch, getState) => {
    dispatch({
      type: newsActionTypes.START_REQUEST
    });

    try {
      const { pageOffset } = getState().news;
      const response = await newsAPI.getNews(searchQuery, isLoadMore ? pageOffset : 0);

      dispatch({
        type: newsActionTypes.FINISH_REQUEST
      });

      if (response.data && response.data.status === 'OK') {
        const newsList = processList(response.data.response.docs);

        if (isLoadMore) {
          dispatch({
            type: newsActionTypes.ADD_NEW_ITEMS,
            newsList
          });
        } else {
          dispatch({
            type: newsActionTypes.SET_LIST,
            newsList
          });
        }
      }
    } catch (error) {
      console.error('getNews action: ', error);

      dispatch({
        type: newsActionTypes.FINISH_REQUEST
      });

      if (error.response.data.errors) {
        dispatch({
          type: newsActionTypes.SET_ERROR_MESSAGE,
          errorMessage: error.response.data.errors.join(' ')
        });
      }
    }
  }
}

/*
  Process list of news and grab only needed fields
 */
export const processList = (list) => list.map(item => {
  let image = 'images/logo.jpg';

  if (item.multimedia.length) {
    const source = _find(item.multimedia, item => item.subtype === 'largeWidescreen573' || item.subtype === 'xlarge');

    if (source) {
      image = `${ config.imagesAssetsHost }${ source.url }`;
    }
  }

  return {
    headline: item.headline.main,
    snippet: item.snippet,
    id: item._id,
    link: item.web_url,
    publicationDate: item.pub_date && format(new Date(item.pub_date), 'D MMMM YYYY'),
    image
  }
});