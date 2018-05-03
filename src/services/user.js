import request from '../utils/request';

export async function getUser(id) {
  return request(`/api/user/${id}`, {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function countDevelopers() {
  return request('/api/user/developer/count', {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function updatePassword(params) {
  return request(`/api/user/${params.userId}/password`, {
    method: 'PUT',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function updateMobile(params) {
  return request(`/api/user/${params.userId}/mobile`, {
    method: 'PUT',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function updateEmail(params) {
  return request(`/api/user/${params.userId}/email`, {
    method: 'PUT',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}
