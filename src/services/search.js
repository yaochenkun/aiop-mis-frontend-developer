import request from '../utils/request';

export async function listSearchResult(params) {
  return request('/api/search/list', {
    method: 'POST',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}
