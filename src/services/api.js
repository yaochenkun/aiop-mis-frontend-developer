import request from '../utils/request';

export async function queryNotices() {
  return request('/api/notices');
}
