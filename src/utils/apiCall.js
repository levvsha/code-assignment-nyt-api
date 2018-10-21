import request from 'axios';
import config from 'config';

const responseType = 'json';
const headers = {
  'Content-Type': 'application/json'
};

export default (params) => {
  const url = `${ params.host || config.apiHost }${ params.path }`;
  const method = params.method;

  const requestParams = {
    method, url,
    responseType,
    headers,
    params: {
      api_key: config.apiKey,
      ...(params.params || null)
    }
  };

  if (params.data) requestParams.data = params.data ;

  return request(requestParams);
};
