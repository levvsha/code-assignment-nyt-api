import format from 'date-fns/format';
import _find from 'lodash.find';

import config from 'config';
import * as gameActionTypes from 'constants/NewsConstants';
import * as newsAPI from 'api/newsAPI';

export function toggleNewsCondition(id, isActiveCurrently) {
  return {
    type: gameActionTypes.SET_EXPANDED_NEWS_ID,
    expandedNewsId: isActiveCurrently ? null : id
  }
}

export function getNews(searchQuery) {
  return async (dispatch) => {
    dispatch({
      type: gameActionTypes.START_REQUEST
    });

    try {
      const response = await newsAPI.getNews(searchQuery);

      dispatch({
        type: gameActionTypes.FINISH_REQUEST
      });

      if (response.data && response.data.status === 'OK') {
        const newsList = processList(response.data.response.docs);

        dispatch({
          type: gameActionTypes.SET_LIST,
          newsList
        });
      }
    } catch (error) {
      console.error('getNews action: ', error);

      dispatch({
        type: gameActionTypes.FINISH_REQUEST
      });
    }
  }
}

const processList = (list) => list.map(item => {
  let image = '/images/logo.png';

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