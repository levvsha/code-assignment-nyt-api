import apiCall from 'utils/apiCall';

export function getNews(query = 'amsterdam') {
  return apiCall({
    method: 'GET',
    path: '/svc/search/v2/articlesearch.json',
    params: {
      q: query,
      fq: 'source:("The New York Times")',
      fl: 'web_url,source,news_desk,snippet,multimedia,headline,pub_date,_id'
    }
  });
}
