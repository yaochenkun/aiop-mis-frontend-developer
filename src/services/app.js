import request from '../utils/request';

export async function addApp(params) {
  return request('/api/app', {
    method: 'POST',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listApp(params) {
  return request('/api/app/list', {
    method: 'POST',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listAllApp() {
  return request('/api/app/list', {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function listAbilityUnderApp(params) {
  return request(`/api/app/${params.id}/ability`, {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function deleteApp(params) {
  return request(`/api/app/${params.id}`, {
    method: 'DELETE',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function getApp(params) {
  return request(`/api/app/${params.id}`, {
    method: 'GET',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function updateAppStatus(params) {
  return request(`/api/app/${params.id}/status`, {
    method: 'PUT',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function occupyAbility(params) {
  return request(`/api/app/${params.appId}/ability/${params.abilityId}`, {
    method: 'POST',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function cancelAbility(params) {
  return request(`/api/app/${params.appId}/ability/${params.abilityId}`, {
    method: 'DELETE',
    headers: { token: sessionStorage.getItem('token') },
  });
}

export async function updateAbilityLimit(params) {
  return request(`/api/app/${params.appId}/ability/${params.abilityId}`, {
    method: 'PUT',
    body: params,
    headers: { token: sessionStorage.getItem('token') },
  });
}
