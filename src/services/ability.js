import request from '../utils/request';

export async function addAbility(params) {
  return request('/api/ability', {
    method: 'POST',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listAbility(params) {
  return request('/api/ability/list', {
    method: 'POST',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listAbilityInvokeLogStatistic(params) {
  return request('/api/ability/invoke_log/list', {
    method: 'POST',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listMyAbilities() {
  return request('/api/ability/invoke_log/list', {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listAllAbility() {
  return request('/api/ability/list', {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function deleteAbility(params) {
  return request(`/api/ability/${params.id}`, {
    method: 'DELETE',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function getAbility(params) {
  return request(`/api/ability/${params.id}`, {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function updateAbility(params) {
  return request(`/api/ability/${params.id}`, {
    method: 'PUT',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function countMyAbilityInvokeLogTotal() {
  return request('/api/ability/invoke_log/count', {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function indexMyAbilityInvokeLogRanking() {
  return request('/api/ability/invoke_log/ranking/index', {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}
