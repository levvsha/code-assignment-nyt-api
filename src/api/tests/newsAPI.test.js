jest.mock('utils/apiCall');
import apiCall from 'utils/apiCall';

import {
  getNews
} from '../newsAPI';

describe('news api endpoints', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('getNews endpoint', () => {
    getNews('moscow', 2);

    expect(apiCall).toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({
      method: 'GET',
      path: '/svc/search/v2/articlesearch.json',
      params: {
        q: 'moscow',
        page: 2,
        fq: 'source:("The New York Times")',
        fl: 'web_url,source,news_desk,snippet,multimedia,headline,pub_date,_id'
      }
    });
  });
});